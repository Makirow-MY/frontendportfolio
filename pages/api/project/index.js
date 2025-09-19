import { mongooseConnect } from '@/lib/mongoose';
import { Project } from '@/models/Project';
import { Review } from '@/models/Review';
import { defaultProjects, generateRandomReviews } from '@/lib/default';
import { neon } from '@netlify/neon';
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
  const { method } = req;

   if (method === 'GET') {
    try {
      if (req.query?.id) {
        const [project] = await sql`SELECT * FROM projects WHERE id = ${req.query.id}`;
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }
        // Map reviews from JSONB array
        const reviews = project.review && project.review.length > 0
          ? await sql`SELECT * FROM reviews WHERE id = ANY(${project.review})`
          : [];
        return res.json({
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
          })),
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
        });
      } else if (req.query?.projectcategory) {
        const projects = await sql`SELECT * FROM projects WHERE projectcategory = ${req.query.projectcategory}`;
        const projectsWithReviews = await Promise.all(projects.map(async (project) => {
          const reviews = project.review && project.review.length > 0
            ? await sql`SELECT * FROM reviews WHERE id = ANY(${project.review})`
            : [];
          return {
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
            })),
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
          };
        }));
        return res.json(projectsWithReviews);
      } else if (req.query?.slug) {
        const projects = await sql`SELECT * FROM projects WHERE slug = ${req.query.slug}`;
        const projectsWithReviews = await Promise.all(projects.map(async (project) => {
          const reviews = project.review && project.review.length > 0
            ? await sql`SELECT * FROM reviews WHERE id = ANY(${project.review})`
            : [];
          return {
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
            })),
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
          };
        }));
        return res.json(projectsWithReviews.reverse());
      } else {
        const reviews = await sql`SELECT * FROM reviews ORDER BY createdat DESC`;
        for (const review of reviews) {
          const [project] = await sql`SELECT id FROM projects WHERE id = ${review.project_id}`;
          if (!project) {
            await sql`DELETE FROM reviews WHERE id = ${review.id}`;
          }
        }
        const projects = await sql`SELECT * FROM projects`;
        const projectsWithReviews = await Promise.all(projects.map(async (project) => {
          const reviews = project.review && project.review.length > 0
            ? await sql`SELECT * FROM reviews WHERE id = ANY(${project.review})`
            : [];
          return {
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
            })),
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
          };
        }));
        return res.json(projectsWithReviews.reverse());
      }
    } catch (error) {
      return res.status(500).json({ message: error || "Server Error" });
    }
  } else {
    res.status(405).json({ message: "Error, Method Is Not Allowed!" });
  }
}