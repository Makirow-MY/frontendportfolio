import { mongooseConnect } from '@/lib/mongoose';
import { Project } from "@/models/Project";
import { Review } from '@/models/Review';
import { Blog } from '@/models/Blog';
import { Comment } from '@/models/Comment';

import toast from 'react-hot-toast';

export default async function handler(req, res) {
    
await mongooseConnect();
const method = req.method;
const {slug} = req.query;
 //console.log('slluuuuugg22222222', slug)
if (method === 'GET') {
       if (slug) {
      //  console.log('slluuuuugg', slug)
        try {
            const project = await Project.findOne({slug});
          //  console.log('slluuuuugg', slug, "project", project)
            if (!project) {
                 return res.status(404).json({message: " No Project Found "})
            }
          
            const review = await Review.find({project: project._id}).sort({createdAt: -1});
           // console.log("Slug", slug, "Blog", blog, comments)
            if (project.review.length > 0) {
                  project.review.forEach(async(review) => {
                      const reviewFetch = await Review.findById(review);
                          
                            if (!reviewFetch) {
                                  project.review = project.review.filter(rev => rev !== review);
                                  
                                  await project.save();
                            }
 })
             }

            res.status(200).json({project, review})
        } catch (error) {
            console.log(error);
             return res.status(500).json({message: "Server Error"})
        }
             
       }
       

} 

else if (method === 'POST') {

     if (slug) {
        
  try {


         const {
             title,
        projectSlug,
        name,
        email,
        image,
         role,
        company,
         website,
         rating,
         message,
         consent,
          commentId,
         deleteEmail
          } = req.body;

        if (!commentId && !deleteEmail) {
            
const project = await Project.findOne({slug});

        if (!project) {
             return res.status(404).json({message: " No Blog Found "})
        }
        
        else{
             const newReview = new Review({
         name,
          image: image || `https://ui-avatars.com/api/?name=${name}&background=random`, 
          email, 
           projectName: project.title,
        projectSlug: project.slug, 
          role,
        company,
         website,
         rating,
         message,
         consent: consent,
        project: project._id,
        })

    await newReview.save(); 
    project.review.push(newReview._id);
    await project.save();
    res.status(201).json(newReview);

        }

        }

        else{
       
                   const check = await Review.findOne({email:deleteEmail, _id: commentId})
            if (check) {
               
                if (check._id) {
                     
                     await Review.findByIdAndDelete({_id: check._id});
                      return res.status(201).json({message: "Comment Deleted! successffully "})
                }
            } else {
                 toast.error("By your email, you are not permitted to delete this post")
                   return res.status(503).json({message: "By your email, you are not permitted to delete this post",
                     error: true})
            }
           
           
            // const parentcomment = await Comment.findByIdAndDelete({_id: commentId});
            //    if (!parentcomment) {
            //  return res.status(404).json({message: " Parent Comment Not Found! "})
      //  }

    }

        
    } catch (error) {
             res.status(500).json({message: "Server Error"});
    }


     }
   
}

else {
 
    res.setHeader('Allow', ['GET', 'POST']); 
    res.status(405).end(`Method ${method} is not allowed`);
    
}

}
