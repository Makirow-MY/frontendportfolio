import { mongooseConnect } from "@/lib/mongoose";
import { Shop } from "@/models/Shop";

export default async function handle(req, res) {
await mongooseConnect();
const {method} = req;
    
    if (method === 'GET') {
           if (req.query?.id) {
                const Shop = await Shop.findById(req.query.id);
                res.json(Shop)
           }
           
           else if (req.query?.slug) {
                 const Shopslug = await Shop.find({slug: req.query.slug});
                res.json(Shopslug.reverse())
           }
           else{
            const Shops = await Shop.find();
                res.json(Shops.reverse())
           
           }
    
    } else {
    
        res.status(405).json({message: "Error, Method Is Not Allowed!"});
        
    }
}