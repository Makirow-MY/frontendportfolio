import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";

export default async function handle(req, res) {
await mongooseConnect();
const {method} = req;

if (method === 'GET') {    
        const projects = await Review.find().sort({createdAt: 1});      
            res.json(projects.reverse())

} else {

    res.status(405).json({message: "Error, Method Is Not Allowed!"});
    
}
}