import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact";
const nodemailer = require('nodemailer');
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

export default async function handlecont(req, res) {

    const {method} = req;
// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nfasthinker@gmail.com',
    pass: 'fdnl qebj scyz brpu'
  }
});

    if (method === "POST") {
   // console.log("CONTACT DATA", req.body);

    // Clear the collection before inserting new data;

    try {

const mailOptions = {
  from: `"MYGL Tech | Digital Solutions"  <nfasthinker@gmail.com>`,
  to: 'computerengineermakia@gmail.com',
  subject: generateEmailSubject(req.body),
  html: generateEmailHtml(req.body)
};

// 
function generateEmailSubject(formData) {
  if (formData.engagementType === 'project') {
    return `New Project Inquiry: ${formData.serviceSelection.serviceType} | ${formData.clientInfo.company || formData.clientInfo.firstName}`;
  } else {
    return `Employment Opportunity: ${formData.serviceSelection.employmentDetails.jobTitle || 'Technical Role'}`;
  }
}

function generateHeaderSubtitle(formData) {
  if (formData.engagementType === 'project') {
    return `${formData.clientInfo.company ? 'From ' + formData.clientInfo.company : 'Personal Project'} • ${formData.serviceSelection.serviceType}`;
  } else {
    const details = formData.serviceSelection.employmentDetails;
    return `${details.company || 'Company'} • ${details.jobTitle || 'Technical Position'} • ${details.roleType || 'Full-time'}`;
  }
}

function generateOpeningParagraph(formData) {
  const client = `${formData.clientInfo.firstName} ${formData.clientInfo.lastName}`;
  const contact = formData.clientInfo.contactMethod === 'Email' ? 
    `You can respond directly to <span> ${formData.clientInfo.email}</span>` : 
    `<b>Preferred contact method:</b> <span> ${formData.clientInfo.contactMethod} (${formData.clientInfo.phone}) <span>`;

  if (formData.engagementType === 'project') {
    return `
    <p>You've received a detailed project inquiry from <b> ${client} </b> regarding <span> ${formData.serviceSelection.serviceType} services </span>.
    </br> 
    ${contact}. The client discovered your work through <span> ${formData.clientInfo.referralSource || 'direct search'}</span>.</p>
   
    <p>Below you'll find comprehensive details about the project requirements, timeline, and client expectations:</p>`;
  } else {
    return `
    <p><b> ${client} </b> has reached out regarding a <span> ${formData.serviceSelection.employmentDetails.jobTitle || 'technical position'} </span> opportunity. 
    </br>${contact}. This inquiry came through <span> ${formData.clientInfo.referralSource || 'your professional network'}</span>.</p>
    <p>The complete position details and requirements are outlined below:</p>`;
  }
}

function generateProjectDetails(formData) {
  const service = formData.serviceSelection.serviceType;
  const details = formData.serviceSelection[`${service.toLowerCase().split(" ")[0]}Details`];
  const timeline = `
    <tr>
      <td width="30%">Project Start</td>
      <td width="70%"><strong>${new Date(formData.projectInfo.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></td>
    </tr>
    <tr>
      <td>Expected Completion</td>
      <td><strong>${new Date(formData.projectInfo.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></td>
    </tr>
    <tr>
      <td>Total Duration</td>
      <td><strong>${calculateProjectDuration(formData.projectInfo.startDate, formData.projectInfo.deadline)}</strong></td>
    </tr>`;

  return `
  <div style="margin:40px 0;">
    <h3 style="color:#2c3e50;border-bottom:1px solid #eee;padding-bottom:8px;">Project Overview</h3>
    
    <table width="100%" style="margin:20px 0;border-collapse:collapse;">
      <tr>
        <td width="30%">Service Type</td>
        <td width="70%"><strong>${service}</strong></td>
      </tr>
      ${details.type ? `
      <tr>
        <td>Project Type</td>
        <td><strong>${details.type}</strong></td>
      </tr>` : ''}
      <tr>
        <td>Budget Range</td>
        <td><strong>${formData.projectInfo.budgetRange}</strong> (${formData.projectInfo.urgency})</td>
      </tr>
    </table>

    <h4 style="color:#e67e22;margin:25px 0 15px;">Project Timeline</h4>
    <table width="100%" style="margin-bottom:25px;border-collapse:collapse;">
      ${timeline}
    </table>

    ${generateFeaturesSection(formData, service, details)}
  </div>`;
}

function calculateProjectDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  return months > 1 ? `${months} months` : `${Math.round((end - start) / (1000 * 60 * 60 * 24))} days`;
}

function generateFeaturesSection(formData, service, details) {
  let featuresHtml = '';
  const featureSections = [
    { 
      title: 'Core Requirements', 
      items: details.defaultPages || details.defaultScreens || [],
      style: 'background:#f8f9fa;color:#2c3e50;border:1px solid #ddd;' 
    },
    { 
      title: 'Premium Add-ons', 
      items: details.additionalPages || details.additionalScreens || [],
      style: 'background:#e8f5e9;color:#2e7d32;border:1px solid #c8e6c9;' 
    },
    { 
      title: 'Technical Specifications', 
      items: details.needs || [],
      style: 'background:#e3f2fd;color:#1976d2;border:1px solid #bbdefb;' 
    }
  ];

  featureSections.forEach(section => {
    if (section.items.length > 0) {
      featuresHtml += `
      <div style="margin-bottom:20px;">
        <h5 style="margin:0 0 10px;color:#7f8c8d;font-size:14px;text-transform:uppercase;">${section.title}</h5>
        <div>
          ${section.items.map(item => `
            <span style="display:inline-block;${section.style}padding:6px 12px;border-radius:4px;margin:0 8px 8px 0;font-size:13px;">
              ${item}
            </span>
          `).join('')}
        </div>
      </div>`;
    }
  });

  return featuresHtml;
}

function generateEmploymentDetails(formData) {
  const details = formData.serviceSelection.employmentDetails;
  
  return `
  <div style="margin:40px 0;">
    <h3 style="color:#2c3e50;border-bottom:1px solid #eee;padding-bottom:8px;">Opportunity Details</h3>
    
    <table width="100%" style="margin:20px 0;border-collapse:collapse;">
      ${details.jobTitle ? `
      <tr>
        <td width="30%">Position Title</td>
        <td width="70%"><strong>${details.jobTitle}</strong></td>
      </tr>` : ''}
      <tr>
        <td>Employment Type</td>
        <td><strong>${details.roleType || 'Not specified'}</strong></td>
      </tr>
      ${details.company ? `
      <tr>
        <td>Company</td>
        <td><strong>${details.company}</strong></td>
      </tr>` : ''}
      ${details.industry ? `
      <tr>
        <td>Industry</td>
        <td><strong>${details.industry}</strong></td>
      </tr>` : ''}
      ${details.salaryExpectation ? `
      <tr>
        <td>Compensation</td>
        <td><strong>${details.salaryExpectation}</strong></td>
      </tr>` : ''}
    </table>

    ${details.jobDescription ? `
    <h4 style="color:#e67e22;margin:25px 0 15px;">Position Overview</h4>
    <div style="background:#f8f9fa;padding:15px;border-radius:4px;border-left:3px solid #e67e22;">
      <p style="margin:0;">${details.jobDescription}</p>
    </div>` : ''}
  </div>`;
}

function generateNextSteps(formData) {
  const steps = formData.engagementType === 'project' ? [
    'Review all project specifications and client background information',
    'Evaluate resource availability and timeline feasibility',
    'Prepare preliminary questions for discovery discussion',
    'Draft initial proposal with scope, timeline, and cost estimates'
  ] : [
    'Review the position requirements and company information',
    'Assess fit with current professional commitments',
    'Prepare relevant work samples and qualifications',
    'Draft response with availability for further discussions'
  ];

  return steps.map(step => `<li style="margin-bottom:12px;padding-left:5px;">${step}</li>`).join('');
}

function generateClientNotes(notes) {
  if (!notes) return '';
  return `
  <div style="background:#f8f9fa;border-left:4px solid #e67e22;padding:20px;margin:30px 0;border-radius:0 4px 4px 0;">
    <h4 style="margin-top:0;color:#e67e22;">Client's Vision Statement</h4>
    <blockquote style="margin:0;font-style:italic;color:#555;border-left:2px solid #ddd;padding-left:15px;">
      ${notes}
    </blockquote>
  </div>`;
}

function generateSignature() {
  return `
  <div style="margin-top:40px;padding-top:30px;border-top:1px solid #eee;">
    <table width="100%">
      <tr>
        <td width="80" style="vertical-align:top;padding-right:20px;">
          <img src="https://yourdomain.com/signature-photo.jpg" width="80" style="border-radius:50%;">
        </td>
        <td style="vertical-align:top;">
          <p style="margin:0 0 5px;font-size:18px;color:#2c3e50;font-weight:600;">Your Name</p>
          <p style="margin:0 0 5px;color:#7f8c8d;">Principal Architect & Founder</p>
          <p style="margin:0 0 5px;color:#7f8c8d;">Your Company Name</p>
          <p style="margin:10px 0 0;">
            <a href="tel:+1234567890" style="color:#e67e22;text-decoration:none;">+1 (234) 567-890</a> • 
            <a href="mailto:you@yourdomain.com" style="color:#e67e22;text-decoration:none;">you@yourdomain.com</a>
          </p>
        </td>
      </tr>
    </table>
  </div>`;
}

function generateFooter() {
  return `
  <div style="background:#2c3e50;color:#fff;padding:40px 20px;text-align:center;margin-top:40px;">
    <img src="https://yourdomain.com/logo-white.png" width="120" style="margin-bottom:20px;">
    <p style="margin:0 0 15px;font-size:14px;color:#bdc3c7;">
      Transforming complex challenges into elegant digital solutions since 1999
    </p>
    <div style="margin:20px 0;">
      <a href="#" style="margin:0 10px;"><img src="https://yourdomain.com/social-twitter.png" width="24" alt="Twitter"></a>
      <a href="#" style="margin:0 10px;"><img src="https://yourdomain.com/social-linkedin.png" width="24" alt="LinkedIn"></a>
      <a href="#" style="margin:0 10px;"><img src="https://yourdomain.com/social-github.png" width="24" alt="GitHub"></a>
    </div>
    <p style="margin:10px 0 0;font-size:12px;color:#bdc3c7;">
      © ${new Date().getFullYear()} Your Company Name. All rights reserved.<br>
      123 Tech Avenue, Silicon Valley, CA 94107 | <a href="https://yourdomain.com" style="color:#ecf0f1;">yourdomain.com</a>
    </p>
  </div>`;
}

function generateEmailHtml(formData) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${generateEmailSubject(formData)}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
    }
    .email-container {
      max-width: 700px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 5px 30px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #2c3e50 0%, #1a2530 100%);
      color: white;
      padding: 50px 20px;
      text-align: center;
      border-bottom: 5px solid #e67e22;
    }
    .header h1 {
      margin: 20px 0 10px;
      font-size: 28px;
      font-weight: 300;
      text-transform: capitalize;
    }
    .header p {
      margin: 0;
      font-size: 16px;
      opacity: 0.9;
       text-transform: capitalize;
       font-weight: 400;
    }
    .content {
      padding: 50px;
    }
    h2 {
      color: #2c3e50;
      font-size: 24px;
       text-transform: capitalize;
      margin-top: 0;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    h3 {
      color: #2c3e50;
      font-size: 20px;
       text-transform: capitalize;
      margin: 35px 0 20px;
    }
    h4 {
      color: #e67e22;
      font-size: 16px;
      margin: 25px 0 15px;
    }
      span {
      color: #e67e22;
      
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    td {
      padding: 8px 0;
      vertical-align: top;
    }
    .btn {
      display: inline-block;
      padding: 12px 25px;
      background: #e67e22;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
      margin: 10px 5px;
    }
    .btn-outline {
      background: transparent;
      border: 2px solid #e67e22;
      color: #e67e22;
    }
    @media (max-width: 600px) {
      .content {
        padding: 30px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>${formData.engagementType === 'project' ? 'New Project Inquiry' : 'Employment Opportunity'}</h1>
      <p>${generateHeaderSubtitle(formData)}</p>
    </div>

    <div class="content">
      <h2>Detailed Inquiry from ${formData.clientInfo.firstName} ${formData.clientInfo.lastName}</h2>
      
      ${generateOpeningParagraph(formData)}
      
      ${formData.engagementType === 'project' ? generateProjectDetails(formData) : generateEmploymentDetails(formData)}
      
      ${generateClientNotes(formData.projectInfo.notes)}
      
      <h3>Recommended Next Steps</h3>
      <ol style="margin:20px 0 30px;padding-left:25px;">
        ${generateNextSteps(formData)}
      </ol>

      <div style="text-align:center;margin:40px 0 30px;">
        <a href="https://calendly.com/yourusername/consultation" class="btn">
          ${formData.engagementType === 'project' ? 'Schedule Discovery Call' : 'Schedule Interview'}
        </a>
        <a href="https://yourdomain.com/dashboard" class="btn btn-outline">
          View Client Portal
        </a>
      </div>

      ${generateSignature()}
    </div>

    ${generateFooter()}
  </div>
</body>
</html>`;
}

// function generateSignature() {
//   return `
//   <table width="100%" border="0" cellspacing="0" cellpadding="0">
//     <tr>
//       <td style="width:80px; padding-right:20px;">
//         <img src="https://yourdomain.com/signature-photo.jpg" alt="Nfas Thinker" width="80" style="border-radius:50%; display:block;">
//       </td>
//       <td>
//         <p style="margin:0 0 5px; font-weight:600;">Nfas Thinker</p>
//         <p style="margin:0 0 5px; color:#6c757d; font-size:14px;">Founder & Principal Architect</p>
//         <p style="margin:0; color:#6c757d; font-size:14px;">NFAS Thinker Digital Solutions</p>
//       </td>
//     </tr>
//   </table>`;
// }

// function generateFooter() {
//   return `
//   <div class="footer">
//     <table width="100%" border="0" cellspacing="0" cellpadding="0">
//       <tr>
//         <td align="center" style="padding-bottom:15px;">
//           <img src="https://yourdomain.com/logo-icon-white.png" alt="NFAS Thinker" width="40" style="opacity:0.8;">
//         </td>
//       </tr>
//       <tr>
//         <td align="center" style="padding-bottom:15px;">
//           <p style="margin:0; font-size:12px; color:#bdc3c7;">Transforming complex challenges into elegant digital solutions</p>
//         </td>
//       </tr>
//       <tr>
//         <td align="center" style="padding-bottom:20px;">
//           <a href="#" style="margin:0 10px;"><img src="https://yourdomain.com/social-twitter.png" width="24" alt="Twitter"></a>
//           <a href="#" style="margin:0 10px;"><img src="https://yourdomain.com/social-linkedin.png" width="24" alt="LinkedIn"></a>
//           <a href="#" style="margin:0 10px;"><img src="https://yourdomain.com/social-github.png" width="24" alt="GitHub"></a>
//         </td>
//       </tr>
//       <tr>
//         <td align="center" style="padding-bottom:5px;">
//           <p style="margin:0; font-size:11px;">© ${new Date().getFullYear()} NFAS Thinker Digital Solutions. All rights reserved.</p>
//         </td>


     const sender =  await transporter.sendMail(mailOptions);
   
     console.log(" error ContactInforb req.bodyrrrrr", req.body, "sender",sender);

     if(sender.rejected.length > 0 && sender.accepted.length === 0) {
         return res.json({
            success: false,
            data: 'Failed To Send Email',
        })
     }
    else {
        

       const {
        clientInfo: {
          firstName,
          lastName,
          profilePicture,
          email,
          phone,
          company,
          country,
          referralSource,
          contactMethod
        },
        engagementType,
        serviceSelection: {
          serviceType,
          websiteDetails: {
            type: websiteType,
            customDescription: websiteDescription,
            defaultPages,
            additionalPages
          },
          appDetails: {
            type: appType,
            customDescription: appDescription,
            defaultScreens,
            additionalScreens
          },
          designDetails: {
            type: designType,
            customDescription: designDescription
          },
          databaseDetails: { needs: databaseNeeds },
          telecomDetails: {
            needs: telecomNeeds,
            customDescription: telecomDescription
          },
          employmentDetails: {
            roleType,
            jobTitle,
            industry,
            salaryExpectation,
            jobDescription
          }
        },
        projectInfo: {
          startDate,
          deadline,
          budgetRange,
          notes,
          urgency
        }
      } = req.body;
  
      const contactId = uuidv4();
      const createdAt = new Date();
      const updatedAt = new Date();

      await sql`
        INSERT INTO contacts (
          id, first_name, last_name, email, phone, company, country, notes, budget_range,
          engagement_type, profile_picture, referral_source, contact_method, service_type,
          website_type, website_description, website_default_pages, website_additional_pages,
          app_type, app_description, app_default_screens, app_additional_screens,
          design_type, design_description, database_needs, telecom_needs, telecom_description,
          employment_role_type, employment_job_title, employment_industry,
          employment_salary_expectation, employment_job_description, start_date, deadline,
          urgency, createdat, updatedat
        )
        VALUES (
          ${contactId}, ${firstName}, ${lastName}, ${email}, ${phone}, ${company}, ${country},
          ${notes}, ${budgetRange}, ${engagementType}, ${profilePicture}, ${referralSource},
          ${contactMethod}, ${serviceType}, ${websiteType}, ${websiteDescription},
          ${JSON.stringify(defaultPages)}, ${JSON.stringify(additionalPages)}, ${appType},
          ${appDescription}, ${JSON.stringify(defaultScreens)}, ${JSON.stringify(additionalScreens)},
          ${designType}, ${designDescription}, ${JSON.stringify(databaseNeeds)},
          ${JSON.stringify(telecomNeeds)}, ${telecomDescription}, ${roleType}, ${jobTitle},
          ${industry}, ${salaryExpectation}, ${jobDescription}, ${startDate}, ${deadline},
          ${urgency}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        )
      `;

      const [newContact] = await sql`SELECT * FROM contacts WHERE id = ${contactId}`;
     await sql`
        INSERT INTO notifications (
        type, model, dataid, title, message, createddate, read, createdat, updatedat
        )
        VALUES (
          'add', 'Contact', ${contactId}, 'Contact Inquiry Received',
          ${`User ${firstName}, ${lastName} (email: ${email}, phone: ${phone}) submitted a contact inquiry the website on ${formatDate(new Date())}. Reply Method: "${contactMethod}", Service Type: "${serviceType}", Engagement Type: "${engagementType}". Allocate resources for response to optimize opportunity conversion`},
           CURRENT_TIMESTAMP, FALSE,
          CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        )
      `;

      const ContactInfor = {
        _id: newContact.id,
        clientInfo: {
          firstName: newContact.first_name,
          lastName: newContact.last_name,
          profilePicture: newContact.profile_picture,
          email: newContact.email,
          phone: newContact.phone,
          company: newContact.company,
          country: newContact.country,
          referralSource: newContact.referral_source,
          contactMethod: newContact.contact_method
        },
        engagementType: newContact.engagement_type,
        serviceSelection: {
          serviceType: newContact.service_type,
          websiteDetails: {
            type: newContact.website_type,
            customDescription: newContact.website_description,
            defaultPages: newContact.website_default_pages,
            additionalPages: newContact.website_additional_pages
          },
          appDetails: {
            type: newContact.app_type,
            customDescription: newContact.app_description,
            defaultScreens: newContact.app_default_screens,
            additionalScreens: newContact.app_additional_screens
          },
          designDetails: {
            type: newContact.design_type,
            customDescription: newContact.design_description
          },
          databaseDetails: {
            needs: newContact.database_needs
          },
          telecomDetails: {
            needs: newContact.telecom_needs,
            customDescription: newContact.telecom_description
          },
          employmentDetails: {
            roleType: newContact.employment_role_type,
            jobTitle: newContact.employment_job_title,
            industry: newContact.employment_industry,
            salaryExpectation: newContact.employment_salary_expectation,
            jobDescription: newContact.employment_job_description
          }
        },
        projectInfo: {
          startDate: newContact.start_date,
          deadline: newContact.deadline,
          budgetRange: newContact.budget_range,
          notes: newContact.notes,
          urgency: newContact.urgency
        },
        createdAt: newContact.createdat,
        updatedAt: newContact.updatedat
      };

      console.log("ContactInfor", ContactInfor);
  

     return res.json({
            success: true,
            data: ContactInfor,
            message: 'Contact email sent successfully'
        })


     }
     
    } catch (error) {
         console.log(" error ContactInforb error", error);
        return res.json({
            success: false,
            data: error,
        })

    }








    }
//      else if (method === "GET") {
//           if (req.query?.id) {
//             const blogDoc = await Contact.findById(req.query?.id);

//             if (blogDoc) {
//                 return res.json({
//                     success: true,
//                     data: blogDoc,
//                     message: ""
//                 })
//             }
//          else{
//             return res.json({
//                 success: false,
//                 data: null,
//                 message: "failed to get blog document, verify blog id"
//             })
//          }

//           } else {

//             const Doc = (await Contact.find()).reverse();

//             return res.json({
//                 success: true,
//                  data: Doc,
//                  message: ""
//             })

//           }
//     }

//     else if (method === "PUT"){
//         const {_id,  name, lname, email, price, company, country, description, phone, project} = req.body;
//         if (!_id) {
//             return res.json({
//                 success: false,
//                 message: "Error! _Id Missing",

//             })
//         }
//         else{
//             await Contact.updateOne({_id}, {
//                 name, lname, email, price, company, country, description, phone, project
//             })

//             return res.json({
//                 success: true,
//                 message: "_Id Missing",

//             })
//         }
//     }

//     else if (method === "DELETE"){
//         if (req.query?.id) {
//             await Contact.deleteOne(req.query?.id);

//             return res.json({
//                 success: true,
//                 message: "",

//             })

//           } else {

//             return res.json({
//                 success: false,
//                 message: "Failed to delete blog",

//             })

//           }
//     }

// }
}