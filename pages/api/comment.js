import { mongooseConnect } from "@/lib/mongoose";
import { Comment } from "@/models/Comment";
import { neon } from '@neondatabase/serverless';
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
  
if (method === 'GET'){
         let comments = [];
               //blog: blog._id
                try {
                    const pgComments = await sql`SELECT * FROM comments ORDER BY createdat DESC`;
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
                
      res.status(200).json(comments);
        }
       else {
     
        res.setHeader('Allow', ['POST']); 
        res.status(405).end(`Method ${method} is not allowed`);
        
    }
    
}
