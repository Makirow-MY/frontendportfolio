import { mongooseConnect } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import { Comment } from '@/models/Comment';
import toast from 'react-hot-toast';
import { neon } from '@netlify/neon';
import { v4 as uuidv4 } from 'uuid';

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
const sql = neon('postgresql://neondb_owner:npg_P6GLxeoWFS5u@ep-curly-heart-ae2jb0gb-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'); // Use process.env.DATABASE_URL if needed

export default async function handler(req, res) {
    
  const randomNum = Math.floor(Math.random() * 100) + 1;
        const gender = randomNum % 2 === 0 ? 'female' : 'male';
        const imageNumber = Math.floor(Math.random() * 100);
const method = req.method;
const {slug} = req.query;

if (method === 'GET') {
    
       if (slug) {
          
             const queryblogslug = slug;
             let blog = null;
            try {
                const pgBlogs = await sql`SELECT * FROM blogs WHERE slug = ${slug}`;
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
                else{
                     return res.status(404).json({message: " No Blog Found "})
                }
            } catch (neonError) {
                console.log('Neon GET single failed:', neonError);
                return res.status(500).json({ 
                    error: true,
                    message: `Failed to retrieve that particular data` 
                });
            }


               let comments = [];
               //blog: blog._id
                try {
                    const pgComments = await sql`SELECT * FROM comments WHERE blog = ${blog._id}`;
                    comments = pgComments.map(pgComment => ({
                        _id: pgComment.id,
                        name: pgComment.name,
                        image: pgComment.image,
                        email: pgComment.email,
                        title: pgComment.title,
                        contentPera: pgComment.contentpera,
                        mainComment: pgComment.maincomment,
                        createdAt: pgComment.createdat,
                        blog: pgComment.blog,
                        blogTitle: pgComment.blogtitle,
                        parent: pgComment.parent,
                        children: pgComment.children,
                        parentName: pgComment.parentname,
                        parentImage: pgComment.parentimage,
                        updatedAt: pgComment.updatedat
                    }));
                } catch (neonError) {
                    console.error('Neon GET all failed:', neonError);
                }
                res.status(200).json({blog, comments})
          
          
       }

} 

else if (method === 'POST') {

   if (slug) {
      try {
        const { name, title, image, email, contentPera, mainComment, parent, commentId, deleteEmail, commentmainComment } = req.body;

        if (!commentId && !deleteEmail) {
          let blog = null;
          try {
            const pgBlogs = await sql`SELECT * FROM blogs WHERE slug = ${slug}`;
            if (pgBlogs.length > 0) {
              const pgBlog = pgBlogs[0];
              blog = {
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
              };
            } else {
              return res.status(404).json({ message: " No Blog Found " });
            }
          } catch (neonError) {
            console.log('Neon GET single failed:', neonError);
            return res.status(500).json({
              error: true,
              message: `Failed to retrieve that particular data`
            });
          }

          if (!blog) {
            return res.status(404).json({ message: " No Blog Found " });
          } 
          else if (parent) {
           
            let parentcomment = null;
            try {
              const pgComments = await sql`SELECT * FROM comments WHERE id = ${parent}`;
              if (pgComments.length > 0) {
                const pgComment = pgComments[0];
                parentcomment = {
                  _id: pgComment.id,
                  name: pgComment.name,
                  image: pgComment.image,
                  email: pgComment.email,
                  title: pgComment.title,
                  contentPera: pgComment.contentpera,
                  mainComment: pgComment.maincomment,
                  createdAt: pgComment.createdat,
                  blog: pgComment.blog,
                  blogTitle: pgComment.blogtitle,
                  parent: pgComment.parent,
                  children: pgComment.children,
                  parentName: pgComment.parentname,
                  parentImage: pgComment.parentimage,
                  updatedAt: pgComment.updatedat
                };
              }
            } catch (neonError) {
              console.error('Neon GET single failed:', neonError);
               return res.status(404).json({ message: " Failed to find main comment " });
         
            }

            
            if (!parentcomment) {
              return res.status(404).json({ message: " Parent Comment Not Found! " });
            }

            // Insert new reply comment
            const replyId = uuidv4();
            try{
            await sql`
              INSERT INTO comments (
               id, name, image, email, title, contentpera, maincomment,
                createdat, blog, blogtitle, parent, children, parentname, parentimage
              )
              VALUES (
                ${replyId}, ${name}, ${`https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/${gender}/512/${imageNumber}.jpg`},
                ${email}, ${title}, ${contentPera}, ${mainComment}, CURRENT_TIMESTAMP,
                ${blog._id}, ${blog.title}, ${parentcomment._id}, ${JSON.stringify([])},
                ${parentcomment.name}, ${parentcomment.image}
              )
            `;
           console.log( { name, title, image, email, contentPera, mainComment, parent, commentId, deleteEmail, commentmainComment, parentcomment }
           )

          }
            catch(error){
     console.error("failed to insert reply comment", error)
            } 
   try{
              await sql`
            INSERT INTO notifications (type, model, dataid, title, message, createddate)
            VALUES (
              'add',
              'Comment',
              ${replyId},
              'Comment Submission Noted',
              ${`User ${name} (email: ${email}) replied to a comment submitted by "${parentcomment.name}" on the blog titled "${blog.title}", through the website on ${formatDate(new Date())}. Details: title "${title}", content "${contentPera}", parent reference ${parentcomment.name}. Perform moderation to uphold content standards and facilitate engagement.`},
              CURRENT_TIMESTAMP
            )
          `;
        }
        catch(error){
          console.error(error)
 return res.status(404).json({ message: " Parent Comment Not Found! " });
         
        }
           

            // Update parent comment's children array
            const updatedChildren = [...parentcomment.children, replyId];
            await sql`
              UPDATE comments
              SET children = ${JSON.stringify(updatedChildren)},
                  updatedat = CURRENT_TIMESTAMP
              WHERE id = ${parentcomment._id}
            `;

            // Fetch the new reply comment
            const [newReply] = await sql`SELECT * FROM comments WHERE id = ${replyId}`;

            return res.status(201).json({
              _id: newReply.id,
              name: newReply.name,
              title: newReply.title,
              image: newReply.image,
              email: newReply.email,
              contentPera: newReply.contentpera,
              mainComment: newReply.maincomment,
              parent: newReply.parent,
              blog: newReply.blog,
              blogTitle: newReply.blogtitle,
              parentName: newReply.parentname,
              parentImage: newReply.parentimage,
              createdAt: newReply.createdat,
              updatedAt: newReply.updatedat
            });
          } else {
            // Insert new main comment
            const mainId = uuidv4();
            await sql`
              INSERT INTO comments (
                id, name, image, email, title, contentpera, maincomment,
                createdat, blog, blogtitle, parent, children, parentname, parentimage
              )
              VALUES (
                ${mainId}, ${name}, ${`https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/${gender}/512/${imageNumber}.jpg` },
                ${email}, ${title}, ${contentPera}, ${mainComment}, CURRENT_TIMESTAMP,
                ${blog._id}, ${blog.title}, NULL, ${JSON.stringify([])}, '', ''
              )
            `;

             try{
              await sql`
            INSERT INTO notifications (type, model, dataid, title, message, createddate)
            VALUES (
              'add',
              'Comment',
              ${mainId},
              'Comment Submission Noted',
              ${`User ${name} (email: ${email}) submitted a comment to the blog "${blog.title}", through the website on ${formatDate(new Date())}. Details: title "${title}", content "${contentPera}", parent reference  "none". Perform moderation to uphold content standards and facilitate engagement.`},
              CURRENT_TIMESTAMP
            )
          `;
        }
        catch(error){
  return res.status(404).json({ message: "Failed to create notification " });

        }

            // Update blog's comments array
            const updatedComments = [...blog.comments, mainId];
            await sql`
              UPDATE blogs
              SET comments = ${JSON.stringify(updatedComments)},
                  updatedat = CURRENT_TIMESTAMP
              WHERE id = ${blog._id}
            `;

            // Fetch the new main comment
            const [newMain] = await sql`SELECT * FROM comments WHERE id = ${mainId}`;

            return res.status(201).json({
              _id: newMain.id,
              name: newMain.name,
              title: newMain.title,
              image: newMain.image,
              email: newMain.email,
              contentPera: newMain.contentpera,
              mainComment: newMain.maincomment,
              parent: newMain.parent,
              blog: newMain.blog,
              blogTitle: newMain.blogtitle,
              parentName: newMain.parentname,
              parentImage: newMain.parentimage,
              createdAt: newMain.createdat,
              updatedAt: newMain.updatedat
            });
          }
        } else {

          if (!commentmainComment) {
            // Check and delete reply comment
            const [check] = await sql`
              SELECT * FROM comments WHERE email = ${deleteEmail} AND id = ${commentId} AND maincomment = ${commentmainComment}
            `;
            if (check) {

               try{
                              await sql`
                            INSERT INTO notifications (type, model, dataid, title, message, createddate)
                            VALUES (
                              'delete',
                              'Comment',
                              ${check.id},
                              'Main Comment Removal Executed',
                              ${`User ${check.name} (email: ${check.email}) removed his/her comment "${check.title}" from the blog "${check.blogtitle}" via our website on ${formatDate(new Date())}, and as a result all replies were removed.
                `},
                              CURRENT_TIMESTAMP
                            )
                          `;
                        }
                        catch(error){
                  return res.status(404).json({ message: "Failed to create notification " });
                
                        }

              await sql`DELETE FROM comments WHERE id = ${check.id}`;
              
              return res.status(201).json({ message: "Comment Deleted successfully " });
            } else {
              return res.status(503).json({ message: "By your email, you are not permitted to delete this post", error: true });
            }
          } 
          else if (commentmainComment) {
            // Check and delete main comment and its replies
            const [check] = await sql`
              SELECT * FROM comments WHERE email = ${deleteEmail} AND id = ${commentId} AND maincomment = ${commentmainComment}
            `;
            if (check) {
              // Delete replies
              if (check.children && check.children.length > 0) {
                      
                await sql`DELETE FROM comments WHERE id = ANY(${check.children})`;
              }
              // Delete main comment
               try{
                              await sql`
                            INSERT INTO notifications (type, model, dataid, title, message, createddate)
                            VALUES (
                              'delete',
                              'Comment',
                              ${check.id},
                              'Main Comment Removal Executed',
                              ${`User ${check.name} (email: ${check.email}) removed his/her comment "${check.title}" from the blog "${check.blogtitle}" via our website on ${formatDate(new Date())}, and as a result all replies were removed.
                `},
                              CURRENT_TIMESTAMP
                            )
                          `;
                        }
                        catch(error){
                  return res.status(404).json({ message: "Failed to create notification " });
                
                        }
              await sql`DELETE FROM comments WHERE id = ${check.id}`;
              return res.status(201).json({ message: "Comment Deleted successfully " });
            } else {
              return res.status(503).json({ message: "By your email, you are not permitted to delete this post", error: true });
            }
          }
        }
      } catch (error) {
        res.status(500).json({ message: "Server Error" });
      }
    }
}

else {
 
    res.setHeader('Allow', ['GET', 'POST']); 
    res.status(405).end(`Method ${method} is not allowed`);
    
}

}












// import { mongooseConnect } from '@/lib/mongoose';
// import { Blog } from '@/models/Blog';
// import { Comment } from '@/models/Comment';
// import toast from 'react-hot-toast';
// import { neon } from '@netlify/neon';
// import { v4 as uuidv4 } from 'uuid';


// const sql = neon('postgresql://neondb_owner:npg_P6GLxeoWFS5u@ep-curly-heart-ae2jb0gb-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'); // Use process.env.DATABASE_URL if needed

// export default async function handler(req, res) {
    
// await mongooseConnect();
// const method = req.method;
// const {slug} = req.query;

// if (method === 'GET') {
//        if (slug) {
//         try {
//             const blog = await Blog.findOne({slug});
//             if (!blog) {
//                  return res.status(404).json({message: " No Blog Found "})
//             }
       
//             const comments = await Comment.find({blog: blog._id}).sort({createdAt: -1});
//              if (blog.comments.length > 0) {
//                               blog.comments.forEach(async(com) => {
//                                   const commentFetch = await Comment.findById(com);
                                      
//                                         if (!commentFetch) {
//                                               blog.comments = blog.comments.filter(rev => rev !== com);
                                              
//                                               await blog.save();
//                                         }
            
//                                         })
//                          }
//            // console.log("Slug", slug, "Blog", blog, comments)
//             res.status(200).json({blog, comments})
//         } catch (error) {
//           //  console.log(error);
//              return res.status(500).json({message: "Server Error"})
//         }
             
//        }
       

//        if (slug) {
//              //const blogslug = await Blog.find({slug: req.query.slug});
//            // res.json(blogslug.reverse())

            
//              const queryblogslug = slug;
//              let blog = null;
//             try {
//                 const pgBlogs = await sql`SELECT * FROM blogs WHERE slug = ${slug}`;
//                 if (pgBlogs.length > 0) {
//                     const pgBlog = pgBlogs[0];
//                     blog = {
//                         _id: pgBlog.id,
//                         title: pgBlog.title,
//                         slug: pgBlog.slug,
//                         images: pgBlog.images,
//                         description: pgBlog.description,
//                         blogcategory: pgBlog.blogcategory,
//                         tags:pgBlog.tags,
//                         status: pgBlog.status,
//                         comments: pgBlog.comments,
//                         createdAt: pgBlog.createdat,
//                         updatedAt: pgBlog.updatedat
//                     };
//                 }
//                 else{
//                      return res.status(404).json({message: " No Blog Found "})
//                 }
//             } catch (neonError) {
//                 console.log('Neon GET single failed:', neonError);
//                 return res.status(500).json({ 
//                     error: true,
//                     message: `Failed to retrieve that particular data` 
//                 });
//             }


//                let comments = [];
//                //blog: blog._id
//                 try {
//                     const pgComments = await sql`SELECT * FROM comments WHERE blog = ${blog._id}`;
//                     comments = pgComments.map(pgComment => ({
//                         _id: pgComment.id,
//                         name: pgComment.name,
//                         image: pgComment.image,
//                         email: pgComment.email,
//                         title: pgComment.title,
//                         contentPera: pgComment.contentpera,
//                         mainComment: pgComment.maincomment,
//                         createdAt: pgComment.createdat,
//                         blog: pgComment.blog,
//                         blogTitle: pgComment.blogtitle,
//                         parent: pgComment.parent,
//                         children: pgComment.children,
//                         parentName: pgComment.parentname,
//                         parentImage: pgComment.parentimage,
//                         updatedAt: pgComment.updatedat
//                     }));
//                 } catch (neonError) {
//                     console.error('Neon GET all failed:', neonError);
//                 }
             
//                 // return res.json({
//                 //     success: true,
//                 //     data: comments,
//                 // });
          
//             if (blog.comments.) {
//                 return res.json(blog);
//             } 
//        }

// } 

// else if (method === 'POST') {

//      if (slug) {
        
//   try {


//          const {name,
//          title,
//           image, 
//           email, 
//           contentPera,
//         mainComment,
//         parent, commentId, deleteEmail, commentmainComment } = req.body;


//         if (!commentId && !deleteEmail) {
            
// const blog = await Blog.findOne({slug});

//         if (!blog) {
//              return res.status(404).json({message: " No Blog Found "})
//         }
//          else  if(parent) {
//                const parentcomment = await Comment.findById(parent);
//                if (!parentcomment) {
//              return res.status(404).json({message: " Parent Comment Not Found! "})
//         }

//          const newComment = new Comment({
//          name,
//          title,
//           image: image || `https://ui-avatars.com/api/?name=${name}&background=random`, 
//           email, 
//           contentPera,
//         mainComment,
//         parent: parentcomment._id,
//         blog: blog._id,
//          blogTitle: blog.title, // Add blog slug for easy reference
//         parentName: parentcomment.name,
//         parentImage: parentcomment.image
//     })

//     await newComment.save();

//     parentcomment.children.push(newComment._id);
//     await parentcomment.save();
// res.status(201).json(newComment);


//         }
//         else{
//              const newComment = new Comment({
//          name,
//          title,
//           image: image || `https://ui-avatars.com/api/?name=${name}&background=random`, 
//           email, 
//           contentPera,
//         mainComment,
//         blog: blog._id,
//         blogTitle: blog.title,
//         })

//     await newComment.save();     
//      blog.comments.push(newComment._id);
//     await blog.save();
//     res.status(201).json(newComment);

//         }

//         }

//         else{
                    
//             if(!commentmainComment){
//                    const check = await Comment.findOne({email:deleteEmail, _id: commentId, mainComment: commentmainComment})
//             if (check) {
               
//                 if (check._id) {
                     
//                      await Comment.findByIdAndDelete({_id: check._id});
//                       return res.status(201).json({message: "Comment Deleted! successffully "})
//                 }
//             } else {
//                 // console.log("Comment no check")
//                  toast.error("By your email, you are not permitted to delete this post")
//                    return res.status(503).json({message: "By your email, you are not permitted to delete this post",
//                      error: true})
//             }
//             } 
//              else if (commentmainComment) {
                
//                  const check = await Comment.findOne({email: deleteEmail, _id: commentId, mainComment: commentmainComment})
           
//         //   console.log("helo am parent comment", {deleteEmail, commentmainComment, commentId }, "CHECK RESULT", check)
                 
//            if (check) {
              
//                 if (check._id) {
//                      const  allchildcom = await Comment.find({parent:check._id })
//                     // console.log("Comment allchildcom check",allchildcom)
//                      allchildcom.forEach(async child => {
//                          await Comment.findByIdAndDelete({_id: child._id})
//                      });
//                      await Comment.findByIdAndDelete({_id: check._id});
//                       return res.status(201).json({message: "Comment Deleted! successffully "})
//                 }
//             } else {
                
//                     return res.status(503).json({message: "By your email, you are not permitted to delete this post",
//                      error: true})
//             }
//             }
           
//             // const parentcomment = await Comment.findByIdAndDelete({_id: commentId});
//             //    if (!parentcomment) {
//             //  return res.status(404).json({message: " Parent Comment Not Found! "})
//       //  }

//     }

        
//     } catch (error) {
//       //  console.log(error)
//             res.status(500).json({message: "Server Error"});
//     }


//      }
   
// }

// else {
 
//     res.setHeader('Allow', ['GET', 'POST']); 
//     res.status(405).end(`Method ${method} is not allowed`);
    
// }

// }
