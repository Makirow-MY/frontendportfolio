import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { Comment } from "@/models/Comment";
import { defaultBlogs,  generateRandomComments } from '@/lib/default';


export default async function handle(req, res) {

await mongooseConnect();
const {method} = req;
  //await populateDefaultBlogs();

if (method === 'GET') {


    try {
    for (const blog of defaultBlogs) {
        const existingBlog = await Blog.findOne({ 
            $and: [
                { slug: blog.slug },
                { title: blog.title }
            ] 
        });
        
        if (!existingBlog) {
            const createdBlog = await Blog.create(blog);
            const commentGroups = generateRandomComments(blog, createdBlog._id);
            const commentIds = [];

            for (const group of commentGroups) {
                try {
                    // Create main comment with blog reference
                    const mainCommentData = {
                        ...group.mainComment,
                        blog: createdBlog._id, // Add blog reference
                        blogTitle: createdBlog.title // Add blog slug for easy reference
                    };
                    const mainComment = await Comment.create(mainCommentData);
                    commentIds.push(mainComment._id);
                   // Prepare reply comments with both parent and blog references
                    const replyComments = group.replyComments.map(reply => ({
                        ...reply,
                        parent: mainComment._id,
                        blog: createdBlog._id, // Add blog reference to replies too
                        blogTitle: createdBlog.title
                    }));

                    // Insert reply comments
                    const createdReplies = await Comment.insertMany(replyComments);
                    
                    // Update main comment with children IDs
                    await Comment.updateOne(
                        { _id: mainComment._id },
                        { $set: { children: createdReplies.map(reply => reply._id) } }
                    );
                   // console.log(`Updated main comment "${mainComment.title}" with ${createdReplies.length} children IDs`);

                    // Add reply comment IDs to blog
                    commentIds.push(...createdReplies.map(reply => reply._id));
                } catch (commentError) {
                    console.error(`Error processing comments for blog "${blog.title}":`, commentError);
                }
            }

            // Update blog with all comment IDs
            await Blog.updateOne(
                { _id: createdBlog._id },
                { $set: { comments: commentIds } } // Using $set instead of $push to ensure complete array
            );
            //console.log(`Updated blog "${blog.title}" with ${commentIds.length} comment IDs`);
        } 
    }
} catch (error) {
    console.error("Error populating default blogs or comments:", error);
}


       if (req.query?.id) {
            const blog = await Blog.findById(req.query.id);
            res.json(blog)
       }
       else if (req.query?.blogcategory) {
          //console.log("category", req.query.blogcategory);
             const blogcat = await Blog.find({blogcategory: req.query.blogcategory});
              console.log("category", req.query?.blogcategory, "blogcat", blogcat);
            res.json(blogcat)
       }
       else if (req.query?.slug) {
             const blogslug = await Blog.find({slug: req.query.slug});
            res.json(blogslug.reverse())
       }
       else{
       
             const comments = await Comment.find().sort({createdAt: 1});
                                    comments.forEach(async (Comment) => {
                                         const getRecent = await Blog.findById(Comment.blog)
                                         if (!getRecent) {
                                            await Comment.deleteOne({_id: Comment._id})
                                         }
                                   })
        const blogs = await Blog.find();
       //console.log("blogs", blogs,"comments", comments);    
            res.json(blogs.reverse())

               
       }

} else {

    res.status(405).json({message: "Error, Method Is Not Allowed!"});
    
}


}