import { mongooseConnect } from '@/lib/mongoose';
import { Project } from '@/models/Project';
import { Review } from '@/models/Review';
import { defaultProjects, generateRandomReviews } from '@/lib/default';

export default async function handle(req, res) {
await mongooseConnect();
const {method} = req;
  
if (method === 'GET') {

       if (req.query?.id) {
            const project = await Project.findById(req.query.id);
            res.json(project)
       }
       else if (req.query?.projectcategory) {
             const projectcat = await Project.find({projectcategory: req.query.projectcategory}).populate('review');
            res.json(projectcat)
       }
       else if (req.query?.slug) {
             const projectslug = await Project.find({slug: req.query.slug});
            res.json(projectslug.reverse())
       }
       else{
       const reviews = await Review.find().sort({ createdAt: -1 });
            reviews.forEach(async (review) => {
                  const getRecent = await Project.findById(review.project)
                  if (!getRecent) {
                     await Review.deleteOne({_id: review._id})
                  }
            })
        const projects = await Project.find().populate('review');
         // console.log("defaultProjects Projects", projects)
            res.json(projects.reverse())
       
       }

} else {

    res.status(405).json({message: "Error, Method Is Not Allowed!"});
    
}
}