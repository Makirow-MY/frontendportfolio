import { mongooseConnect } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import { Comment } from '@/models/Comment';
import toast from 'react-hot-toast';

export default async function handler(req, res) {
    
await mongooseConnect();
const method = req.method;
const {slug} = req.query;

if (method === 'GET') {
       if (slug) {
        try {
            const blog = await Blog.findOne({slug});
            if (!blog) {
                 return res.status(404).json({message: " No Blog Found "})
            }
       
            const comments = await Comment.find({blog: blog._id}).sort({createdAt: -1});
             if (blog.comments.length > 0) {
                              blog.comments.forEach(async(com) => {
                                  const commentFetch = await Comment.findById(com);
                                      
                                        if (!commentFetch) {
                                              blog.comments = blog.comments.filter(rev => rev !== com);
                                              
                                              await blog.save();
                                        }
            
                                        })
                         }
           // console.log("Slug", slug, "Blog", blog, comments)
            res.status(200).json({blog, comments})
        } catch (error) {
          //  console.log(error);
             return res.status(500).json({message: "Server Error"})
        }
             
       }
       

} 

else if (method === 'POST') {

     if (slug) {
        
  try {


         const {name,
         title,
          image, 
          email, 
          contentPera,
        mainComment,
        parent, commentId, deleteEmail, commentmainComment } = req.body;


        if (!commentId && !deleteEmail) {
            
const blog = await Blog.findOne({slug});

        if (!blog) {
             return res.status(404).json({message: " No Blog Found "})
        }
         else  if(parent) {
               const parentcomment = await Comment.findById(parent);
               if (!parentcomment) {
             return res.status(404).json({message: " Parent Comment Not Found! "})
        }

         const newComment = new Comment({
         name,
         title,
          image: image || `https://ui-avatars.com/api/?name=${name}&background=random`, 
          email, 
          contentPera,
        mainComment,
        parent: parentcomment._id,
        blog: blog._id,
         blogTitle: blog.title, // Add blog slug for easy reference
        parentName: parentcomment.name,
        parentImage: parentcomment.image
    })

    await newComment.save();

    parentcomment.children.push(newComment._id);
    await parentcomment.save();
res.status(201).json(newComment);


        }
        else{
             const newComment = new Comment({
         name,
         title,
          image: image || `https://ui-avatars.com/api/?name=${name}&background=random`, 
          email, 
          contentPera,
        mainComment,
        blog: blog._id,
        blogTitle: blog.title,
        })

    await newComment.save();     
     blog.comments.push(newComment._id);
    await blog.save();
    res.status(201).json(newComment);

        }

        }

        else{
                    
            if(!commentmainComment){
                   const check = await Comment.findOne({email:deleteEmail, _id: commentId, mainComment: commentmainComment})
            if (check) {
               
                if (check._id) {
                     
                     await Comment.findByIdAndDelete({_id: check._id});
                      return res.status(201).json({message: "Comment Deleted! successffully "})
                }
            } else {
                // console.log("Comment no check")
                 toast.error("By your email, you are not permitted to delete this post")
                   return res.status(503).json({message: "By your email, you are not permitted to delete this post",
                     error: true})
            }
            } 
             else if (commentmainComment) {
                
                 const check = await Comment.findOne({email: deleteEmail, _id: commentId, mainComment: commentmainComment})
           
        //   console.log("helo am parent comment", {deleteEmail, commentmainComment, commentId }, "CHECK RESULT", check)
                 
           if (check) {
              
                if (check._id) {
                     const  allchildcom = await Comment.find({parent:check._id })
                    // console.log("Comment allchildcom check",allchildcom)
                     allchildcom.forEach(async child => {
                         await Comment.findByIdAndDelete({_id: child._id})
                     });
                     await Comment.findByIdAndDelete({_id: check._id});
                      return res.status(201).json({message: "Comment Deleted! successffully "})
                }
            } else {
                
                    return res.status(503).json({message: "By your email, you are not permitted to delete this post",
                     error: true})
            }
            }
           
            // const parentcomment = await Comment.findByIdAndDelete({_id: commentId});
            //    if (!parentcomment) {
            //  return res.status(404).json({message: " Parent Comment Not Found! "})
      //  }

    }

        
    } catch (error) {
      //  console.log(error)
            res.status(500).json({message: "Server Error"});
    }


     }
   
}

else {
 
    res.setHeader('Allow', ['GET', 'POST']); 
    res.status(405).end(`Method ${method} is not allowed`);
    
}

}
