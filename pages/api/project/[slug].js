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


export default async function handler(req, res) {
  const method = req.method;
  const { slug } = req.query;

  if (method === 'GET') {
    try {
      if (slug) {
        const [project] = await sql`SELECT * FROM projects WHERE slug = ${slug}`;
        if (!project) {
          return res.status(404).json({ message: " No Project Found " });
        }
        const reviews = await sql`SELECT * FROM reviews WHERE project_id = ${project.id} ORDER BY createdat DESC`;
        if (project.review && project.review.length > 0) {
          for (const reviewId of project.review) {
            const [reviewFetch] = await sql`SELECT id FROM reviews WHERE id = ${reviewId}`;
            if (!reviewFetch) {
              project.review = project.review.filter(id => id !== reviewId);
              await sql`
                UPDATE projects
                SET review = ${JSON.stringify(project.review)},
                    updatedat = CURRENT_TIMESTAMP
                WHERE id = ${project.id}
              `;
            }
          }
        }
        return res.status(200).json({
          project: {
            _id: project.id,
            title: project.title,
            slug: project.slug,
            images: project.images,
            client: project.client,
            description: project.description,
            projectcategory: project.projectcategory,
            tags: project.tags,
            livepreview: project.livepreview,
            status: project.status,
            price: project.price,
            review: project.review,
            projectType: project.projecttype,
            technologies: project.technologies,
            features: project.features,
            platforms: project.platforms,
            projectYear: project.projectyear,
            repositoryUrl: project.repositoryurl,
            documentationUrl: project.documentationurl,
            isResponsive: project.isresponsive,
            licenseType: project.licensetype,
            supportAvailable: project.supportavailable,
            categoryFields: project.category_fields,
            createdAt: project.createdat,
            updatedAt: project.updatedat
          },
          review: reviews.map(r => ({
            _id: r.id,
            name: r.name,
            image: r.image,
            email: r.email,
            message: r.message,
            role: r.role,
            website: r.website,
            company: r.company,
            project: r.project_id,
            projectName: r.project_name,
            projectSlug: r.project_slug,
            rating: r.rating,
            consent: r.consent,
            createdAt: r.createdat,
            updatedAt: r.updatedat
          }))
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  } else if (method === 'POST') {
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
          const [project] = await sql`SELECT * FROM projects WHERE slug = ${slug}`;
          if (!project) {
            return res.status(404).json({ message: " No Blog Found " });
          }
          const reviewId = uuidv4();
          const newReview = {
            _id: reviewId,
            name,
            image: image || `https://ui-avatars.com/api/?name=${name}&background=random`,
            email,
            message,
            role,
            website,
            company,
            project: project.id,
            projectName: project.title,
            projectSlug: project.slug,
            rating,
            consent,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          await sql`
            INSERT INTO reviews (
              id, name, image, email, message, role, website, company,
              project_id, project_name, project_slug, rating, consent,
              createdat, updatedat
            )
            VALUES (
              ${reviewId}, ${name}, ${image || `https://ui-avatars.com/api/?name=${name}&background=random`},
              ${email}, ${message}, ${role}, ${website}, ${company},
              ${project.id}, ${project.title}, ${project.slug}, ${rating}, ${consent},
              CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
            )
          `;
          const updatedReviews = [...(project.review || []), reviewId];
          await sql`
            UPDATE projects
            SET review = ${JSON.stringify(updatedReviews)},
                updatedat = CURRENT_TIMESTAMP
            WHERE id = ${project.id}
          `;
          try{
              await sql`
            INSERT INTO notifications (type, model, dataid, title, message, createddate)
            VALUES (
              'add',
              'Review',
              ${reviewId},
              'Review Submission Noted',
              ${`User ${name} (email: ${email}) submitted a review (rating: ${rating}) for project "${project.title}" via our website on ${formatDate(new Date())}. Content: "${message}". Incorporate into performance metrics and initiate response protocols as necessary.`},
              CURRENT_TIMESTAMP
            )
          `;
        }
        catch(error){
  return res.status(404).json({ message: "Failed to create notification " });

        }
          return res.status(201).json(newReview);
        } else {
         
          const [check] = await sql`
            SELECT * FROM reviews WHERE email = ${deleteEmail} AND id = ${commentId}
          `;
          if (check) {

                   try{
              await sql`
            INSERT INTO notifications (type, model, dataid, title, message, createddate)
            VALUES (
              'delete',
              'Review',
              ${check.id},
              'Review Removal Executed',
              ${`User ${check.name} (email: ${check.email}) removed his/her review from project "${check.project_name}" through our website on ${formatDate(new Date())}. Recalibrate review aggregates and document the removal for transparency.
`},
              CURRENT_TIMESTAMP
            )
          `;
        }
        catch(error){
  return res.status(404).json({ message: "Failed to create notification " });

        }

            await sql`DELETE FROM reviews WHERE id = ${check.id}`;

            return res.status(201).json({ message: "Comment Deleted! successfully " });
          } else {
            return res.status(503).json({
              message: "By your email, you are not permitted to delete this post",
              error: true
            });
          }
        }
      } catch (error) {
        return res.status(500).json({ message: "Server Error" });
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} is not allowed`);
  }
}