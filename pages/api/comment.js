import { mongooseConnect } from "@/lib/mongoose";
import { Comment } from "@/models/Comment";

export default async function handle(req, res) {
    await mongooseConnect();
    const {method} = req;
    
    
    if (method === 'POST') {
          try {
            const {name,
         title,
          image, 
          email, 
          contentPera,
        parent } = req.body;

        let commentDoc;
        if (parent) {
            commentDoc = new Comment({
                 name,
         title,
          image: image || `https://ui-avatars.com/api/?name=${name}&background=random`, 
          email, 
          contentPera,
        parent: parent,       
            })
            commentDoc.save()
            await Comment.findByIdAndUpdate(parent, {
                $push: {
                    children: commentDoc._id
                }
            })
            commentDoc.save()
        } else {
               commentDoc = new Comment({
                 name,
         title,
          image: image || `https://ui-avatars.com/api/?name=${name}&background=random`, 
          email, 
          contentPera,
        
            })  
            commentDoc.save() 
        }

        return res.status(201).json(commentDoc);

          } catch (error) {
               console.error("Error creating comment",error)
                res.status(500).json({message: "Failed to create comment"});
          }
           
    
    } 
    
    else if (method === 'GET'){
      const com = await Comment.find()
      res.status(200).json(com)
        }
       else {
     
        res.setHeader('Allow', ['POST']); 
        res.status(405).end(`Method ${method} is not allowed`);
        
    }
    
}
