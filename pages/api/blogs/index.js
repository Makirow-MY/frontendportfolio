import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { Comment } from "@/models/Comment";
import { defaultBlogs,  generateRandomComments } from '@/lib/default';
import { neon } from '@netlify/neon';
import { v4 as uuidv4 } from 'uuid';


const sql = neon('postgresql://neondb_owner:npg_P6GLxeoWFS5u@ep-curly-heart-ae2jb0gb-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'); // Use process.env.DATABASE_URL if needed
const formatDate = (date) => {
  if (!date || isNaN(date)) {
    return '';
  }
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: true
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};
export default async function handle(req, res) {


const {method} = req;
  //await populateDefaultBlogs();

if (method === 'GET') {



       if (req.query?.id) {
           // const blog = await Blog.findById(req.query.id);
           // res.json(blog)
                const queryId = req.query?.id;
            console.log("Query ID:", req.query);
            let blog = null;
            try {
                const pgBlogs = await sql`SELECT * FROM blogs WHERE id = ${queryId}`;
                if (pgBlogs.length > 0) {
                    const pgBlog = pgBlogs[0];
                    blog = {
                        _id: pgBlog.id,
                        title: pgBlog.title,
                        slug: pgBlog.slug,
                        images: pgBlog.images,
                        description: pgBlog.description,
                        blogcategory: pgBlog.blogcategory,
                        tags:pgBlog.tags,
                        status: pgBlog.status,
                        comments: pgBlog.comments,
                        createdAt: pgBlog.createdat,
                        updatedAt: pgBlog.updatedat
                    };
                }
            } catch (neonError) {
                console.error('Neon GET single failed:', neonError);
                return res.status(500).json({ 
                    error: true,
                    message: `Failed to retrieve that particular data` 
                });
            }
          
            if (blog) {
                return res.json(blog);
            } 
       }
       else if (req.query?.blogcategory) {
             // const blogcat = await Blog.find({blogcategory: req.query.blogcategory});
            //  console.log("category", req.query?.blogcategory, "blogcat", blogcat);
          //  res.json(blogcat)

             const queryblogslug = req.query?.blogcategory;
             let blogs = [];
            try {
                const pgBlogs = await sql`SELECT * FROM blogs WHERE blogcategory = ${queryblogslug}`;
                blogs = pgBlogs.map(pgBlog => ({
                    _id: pgBlog.id,
                    title: pgBlog.title,
                    slug: pgBlog.slug,
                    images: pgBlog.images,
                    description: pgBlog.description,
                    blogcategory: pgBlog.blogcategory,
                    tags: pgBlog.tags,
                    status: pgBlog.status,
                    comments: pgBlog.comments,
                    createdAt: pgBlog.createdat,
                    updatedAt: pgBlog.updatedat
                }));
            } catch (neonError) {
                console.error('Neon GET single failed:', neonError);
                return res.status(500).json({ 
                    error: true,
                    message: `Failed to retrieve data with blog category ${queryblogslug} ` 
                });
            }

            if (blogs) {
                return res.json(blogs);
            } 
       }
       else if (req.query?.slug) {
             //const blogslug = await Blog.find({slug: req.query.slug});
           // res.json(blogslug.reverse())

            
             const queryblogslug = req.query.slug;
             let blog = null;
            try {
                const pgBlogs = await sql`SELECT * FROM blogs WHERE slug = ${queryblogslug}`;
                if (pgBlogs.length > 0) {
                    const pgBlog = pgBlogs[0];
                    blog = {
                        _id: pgBlog.id,
                        title: pgBlog.title,
                        slug: pgBlog.slug,
                        images: pgBlog.images,
                        description: pgBlog.description,
                        blogcategory: pgBlog.blogcategory,
                        tags:pgBlog.tags,
                        status: pgBlog.status,
                        comments: pgBlog.comments,
                        createdAt: pgBlog.createdat,
                        updatedAt: pgBlog.updatedat
                    };
                }
            } catch (neonError) {
                console.log('Neon GET single failed:', neonError);
                return res.status(500).json({ 
                    error: true,
                    message: `Failed to retrieve that particular data` 
                });
            }
          
            if (blog) {
                return res.json(blog);
            } 
       }
         else {

            let blogs = [];
            try {
                const pgBlogs = await sql`SELECT * FROM blogs ORDER BY createdat DESC`;
                blogs = pgBlogs.map(pgBlog => ({
                    _id: pgBlog.id,
                    title: pgBlog.title,
                    slug: pgBlog.slug,
                    images: pgBlog.images,
                    description: pgBlog.description,
                    blogcategory: pgBlog.blogcategory,
                    tags: pgBlog.tags,
                    status: pgBlog.status,
                    comments: pgBlog.comments,
                    createdAt: pgBlog.createdat,
                    updatedAt: pgBlog.updatedat
                }));
            } catch (neonError) {
                console.error('Neon GET all failed:', neonError);
              return res.status(500).json({ 
                    error: true,
                    message: `Failed to retrieve all data` 
                });
            }

         let cleanedReferenceCount = 0;

    // For each blog, validate and clean the comments array
    for (const blog of blogs) {

      try {
        // Get current comment IDs from the blog
        const currentCommentIds = blog.comments || [];

        if (currentCommentIds.length > 0) {
       
        // Fetch all existing comment IDs
        const existingComments = await sql`
          SELECT id FROM comments WHERE id = ANY(${currentCommentIds})
        `;

        const validCommentIds = existingComments.map(c => c.id);

        // If there are invalid references, update the blog
        if (validCommentIds.length !== currentCommentIds.length) {
          await sql`
            UPDATE blogs
            SET comments = ${JSON.stringify(validCommentIds)}
            WHERE id = ${blog._id}
          `;
          cleanedReferenceCount += (currentCommentIds.length - validCommentIds.length);
          blog.comments = validCommentIds; // Update in-memory for response
        }
    }
      } catch (neonError) {
        // Silently continue to next blog
      }
    }

    return res.status(200).json(blogs);

}

}else {

    res.status(405).json({message: "Error, Method Is Not Allowed!"});
    
}


}