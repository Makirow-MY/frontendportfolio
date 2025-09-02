import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact";
const nodemailer = require('nodemailer');



export default async function handlecont(req, res) {

    await mongooseConnect();
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
//          const mailOptions = {
//     from: '"Nfas Thinker | Digital Solutions" <nfasthinker@gmail.com>',
//     to: req.body.clientInfo.email,
//     subject: `Thank You for Your Inquiry, ${req.body.clientInfo.firstName}!`,
//     html: `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Your Project Inquiry</title>
//         <style>
//             @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
//             body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f7f9fc; }
//             .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); }
//             .header { background: linear-gradient(135deg, #0066ff 0%, #0033aa 100%); padding: 30px; text-align: center; color: white; }
//             .content { padding: 30px; }
//             .footer { background: #f5f7fa; padding: 20px; text-align: center; font-size: 12px; color: #666666; }
//             .logo { font-size: 24px; font-weight: 700; margin-bottom: 10px; }
//             .project-details { background: #f9f9f9; border-radius: 6px; padding: 20px; margin: 20px 0; }
//             .project-details h3 { margin-top: 0; color: #0066ff; }
//             .project-details p { margin: 5px 0; }
//             .btn-primary { display: inline-block; padding: 12px 24px; background: #0066ff; color: white; text-decoration: none; border-radius: 4px; font-weight: 500; margin: 15px 0; }
//             .signature { margin-top: 30px; }
//             .highlight { color: #0066ff; font-weight: 600; }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <div class="header">
//                 <div class="logo">NFAS THINKER</div>
//                 <h1>Thank You for Choosing Us</h1>
//                 <p>We're excited to work with you on your ${req.body.serviceSelection.websiteDetails.type} project!</p>
//             </div>

//             <div class="content">
//                 <h2>Dear ${req.body.clientInfo.firstName} ${req.body.clientInfo.lastName},</h2>

//                 <p>Thank you for reaching out to us regarding your <span class="highlight">${req.body.serviceSelection.websiteDetails.type} website development</span> project. We've carefully reviewed your requirements and are thrilled about the opportunity to bring your vision to life.</p>

//                 <div class="project-details">
//                     <h3>Your Project Summary</h3>
//                     <p><strong>Project Type:</strong> ${req.body.serviceSelection.websiteDetails.type} Website</p>
//                     <p><strong>Budget Range:</strong> ${req.body.projectInfo.budgetRange}</p>
//                     <p><strong>Timeline:</strong> ${new Date(req.body.projectInfo.startDate).toLocaleDateString()} to ${new Date(req.body.projectInfo.deadline).toLocaleDateString()}</p>
//                     <p><strong>Urgency:</strong> ${req.body.projectInfo.urgency}</p>

//                     <h4 style="margin-top: 20px;">Included Pages:</h4>
//                     <ul>
//                         ${req.body.serviceSelection.websiteDetails.defaultPages.map(page => `<li>${page}</li>`).join('')}
//                     </ul>

//                     ${req.body.serviceSelection.websiteDetails.additionalPages.length > 0 ? `
//                     <h4>Additional Pages Selected:</h4>
//                     <ul>
//                         ${req.body.serviceSelection.websiteDetails.additionalPages.map(page => `<li>${page}</li>`).join('')}
//                     </ul>
//                     ` : ''}
//                 </div>

//                 <p>Your notes about <em>"${req.body.projectInfo.notes}"</em> particularly resonated with us. We share your passion for creating elegant solutions to complex challenges.</p>

//                 <p><strong>Next Steps:</strong></p>
//                 <ol>
//                     <li>Our team will review your requirements in detail within 24 hours</li>
//                     <li>We'll schedule a ${req.body.clientInfo.contactMethod} call at your convenience</li>
//                     <li>You'll receive a detailed proposal with timeline and deliverables</li>
//                 </ol>

//                 <a href="https://calendly.com/nfasthinker/consultation" class="btn-primary">Schedule a Consultation Call</a>

//                 <div class="signature">
//                     <p>Warm regards,</p>
//                     <p><strong>Nfas Thinker</strong></p>
//                     <p>Founder & Lead Developer</p>
//                     <p>NFAS Thinker Digital Solutions</p>
//                     <p>Phone: +1 (555) 123-4567</p>
//                     <p>Email: nfasthinker@gmail.com</p>
//                 </div>
//             </div>

//             <div class="footer">
//                 <p>© ${new Date().getFullYear()} NFAS Thinker Digital Solutions. All rights reserved.</p>
//                 <p>Cameroon, Douala | www.nfasthinker.com</p>
//                 <p><a href="#" style="color: #0066ff; text-decoration: none;">Privacy Policy</a> | <a href="#" style="color: #0066ff; text-decoration: none;">Terms of Service</a></p>
//             </div>
//         </div>
//     </body>
//     </html>
//     `
// };

// const mailOptions = {
//   from: `"NFAS Thinker | Digital Excellence" <nfasthinker@gmail.com>`,
//   to: req.body.clientInfo.email,
//   subject: `Project Confirmation: ${req.body.clientInfo.company} ${req.body.serviceSelection.websiteDetails.type} Website`,
//   html: `
//   <!DOCTYPE html>
//   <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
//   <head>
//     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta name="format-detection" content="telephone=no">
//     <title>Your Vision, Our Expertise</title>
//     <style type="text/css">
//       /* Client-specific styles */
//       body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
//       body { margin: 0 !important; padding: 0 !important; width: 100% !important; background: #f8f9fa; }
//       .ExternalClass { width: 100%; }
//       .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }

//       /* Modern typography */
//       body { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; color: #212529; line-height: 1.6; }
//       h1, h2, h3 { color: #1a1a1a; font-weight: 600; margin-top: 0; }

//       /* Layout */
//       .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; }
//       .header { background: linear-gradient(135deg, #0d47a1 0%, #1976d2 100%); padding: 40px 30px; text-align: center; color: white; }
//       .content { padding: 40px 30px; }
//       .footer { background: #2c3e50; color: #ecf0f1; padding: 30px; text-align: center; font-size: 13px; }

//       /* Components */
//       .project-card { border-left: 4px solid #1976d2; background: #f8f9fa; padding: 25px; margin: 25px 0; border-radius: 0 4px 4px 0; }
//       .timeline-bar { height: 6px; background: #e9ecef; border-radius: 3px; margin: 20px 0; position: relative; }
//       .timeline-progress { height: 100%; background: linear-gradient(90deg, #1976d2 0%, #4fc3f7 100%); border-radius: 3px; width: 33%; }
//       .feature-badge { display: inline-block; background: #e3f2fd; color: #1976d2; padding: 5px 10px; border-radius: 20px; font-size: 12px; margin-right: 8px; margin-bottom: 8px; }
//       .divider { height: 1px; background: linear-gradient(90deg, rgba(25,118,210,0) 0%, rgba(25,118,210,0.5) 50%, rgba(25,118,210,0) 100%); margin: 30px 0; }

//       /* Buttons */
//       .btn { display: inline-block; padding: 14px 28px; background: #1976d2; color: white !important; text-decoration: none; border-radius: 4px; font-weight: 600; text-align: center; }
//       .btn-outline { background: transparent; border: 2px solid #1976d2; color: #1976d2 !important; }

//       /* Responsive */
//       @media screen and (max-width: 600px) {
//         .header, .content, .footer { padding: 25px 20px !important; }
//         .project-card { padding: 20px !important; }
//       }
//     </style>
//   </head>
//   <body>
//     <!-- Email Container -->
//     <div class="email-container">
//       <!-- Header with Gradient -->
//       <div class="header">
//         <table width="100%" border="0" cellspacing="0" cellpadding="0">
//           <tr>
//             <td align="center">
//               <img src="https://yourdomain.com/logo-white.png" alt="NFAS Thinker Logo" width="180" style="max-width:180px; height:auto; display:block;">
//               <h1 style="margin:20px 0 10px; font-size:28px;">Project Initiation Confirmation</h1>
//               <p style="margin:0; font-size:16px; opacity:0.9;">${req.body.clientInfo.company} • ${req.body.serviceSelection.websiteDetails.type} Website</p>
//             </td>
//           </tr>
//         </table>
//       </div>

//       <!-- Main Content -->
//       <div class="content">
//         <!-- Personalized Greeting -->
//         <h2 style="margin-bottom:5px;">Dear ${req.body.clientInfo.firstName},</h2>
//         <p style="margin-top:0;">Thank you for entrusting NFAS Thinker with your vision. We're honored to collaborate on your <strong>${req.body.serviceSelection.websiteDetails.type} website</strong> project and have prepared this comprehensive confirmation.</p>

//         <!-- Project Timeline Visual -->
//         <div style="margin:30px 0;">
//           <p style="margin-bottom:8px; font-weight:500; color:#6c757d;">PROJECT TIMELINE</p>
//           <div class="timeline-bar">
//             <div class="timeline-progress"></div>
//           </div>
//           <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
//             <tr>
//               <td style="width:33%; text-align:left; font-size:12px; color:#6c757d;">Initiation<br>${new Date(req.body.projectInfo.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
//               <td style="width:33%; text-align:center; font-size:12px; color:#6c757d;">Development</td>
//               <td style="width:33%; text-align:right; font-size:12px; color:#6c757d;">Delivery<br>${new Date(req.body.projectInfo.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
//             </tr>
//           </table>
//         </div>

//         <!-- Project Details Card -->
//         <div class="project-card">
//           <h3 style="margin-top:0; color:#1976d2;">Project Specifications</h3>

//           <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:15px 0;">
//             <tr>
//               <td width="40%" style="padding-bottom:10px; color:#6c757d;">Project Type:</td>
//               <td width="60%" style="padding-bottom:10px; font-weight:500;">${req.body.serviceSelection.websiteDetails.type} Website</td>
//             </tr>
//             <tr>
//               <td style="padding-bottom:10px; color:#6c757d;">Budget Range:</td>
//               <td style="padding-bottom:10px; font-weight:500;">${req.body.projectInfo.budgetRange}</td>
//             </tr>
//             <tr>
//               <td style="padding-bottom:10px; color:#6c757d;">Urgency Level:</td>
//               <td style="padding-bottom:10px; font-weight:500;">${req.body.projectInfo.urgency}</td>
//             </tr>
//             <tr>
//               <td style="padding-bottom:10px; color:#6c757d;">Contact Method:</td>
//               <td style="padding-bottom:10px; font-weight:500;">${req.body.clientInfo.contactMethod}</td>
//             </tr>
//           </table>

//           <p style="margin-bottom:5px; color:#6c757d;">Core Pages Included:</p>
//           <div style="margin-bottom:15px;">
//             ${req.body.serviceSelection.websiteDetails.defaultPages.map(page => `
//               <span class="feature-badge">${page}</span>
//             `).join('')}
//           </div>

//           ${req.body.serviceSelection.websiteDetails.additionalPages.length > 0 ? `
//           <p style="margin-bottom:5px; color:#6c757d;">Premium Add-ons Selected:</p>
//           <div>
//             ${req.body.serviceSelection.websiteDetails.additionalPages.map(page => `
//               <span class="feature-badge" style="background:#e8f5e9; color:#2e7d32;">${page}</span>
//             `).join('')}
//           </div>
//           ` : ''}
//         </div>

//         <!-- Client's Vision -->
//         <div style="background:#fff8e1; padding:20px; border-radius:4px; margin:25px 0;">
//           <h3 style="margin-top:0; color:#ff8f00;">Your Vision</h3>
//           <p style="font-style:italic; margin-bottom:0;">"${req.body.projectInfo.notes}"</p>
//         </div>

//         <!-- Next Steps -->
//         <h3>Next Steps</h3>
//         <ol style="margin-top:15px; padding-left:20px;">
//           <li style="margin-bottom:10px;"><strong>Project Kickoff:</strong> Our team will conduct an in-depth analysis within 24-48 hours</li>
//           <li style="margin-bottom:10px;"><strong>Discovery Call:</strong> We'll schedule a ${req.body.clientInfo.contactMethod} consultation at your convenience</li>
//           <li style="margin-bottom:10px;"><strong>Proposal Delivery:</strong> You'll receive a detailed project blueprint with milestones and deliverables</li>
//         </ol>

//         <!-- CTA Buttons -->
//         <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:30px 0;">
//           <tr>
//             <td align="center">
//               <table border="0" cellspacing="0" cellpadding="0">
//                 <tr>
//                   <td align="center" style="padding:0 10px;">
//                     <a href="https://calendly.com/nfasthinker/consultation" class="btn">Schedule Discovery Call</a>
//                   </td>
//                   <td align="center" style="padding:0 10px;">
//                     <a href="https://nfasthinker.com/client-portal" class="btn btn-outline">Access Client Portal</a>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>
//         </table>

//         <!-- Divider -->
//         <div class="divider"></div>

//         <!-- Signature -->
//         <table width="100%" border="0" cellspacing="0" cellpadding="0">
//           <tr>
//             <td style="width:80px; padding-right:20px;">
//               <img src="https://yourdomain.com/signature-photo.jpg" alt="Nfas Thinker" width="80" style="border-radius:50%; display:block;">
//             </td>
//             <td>
//               <p style="margin:0 0 5px; font-weight:600;">Nfas Thinker</p>
//               <p style="margin:0 0 5px; color:#6c757d; font-size:14px;">Founder & Principal Architect</p>
//               <p style="margin:0; color:#6c757d; font-size:14px;">NFAS Thinker Digital Solutions</p>
//             </td>
//           </tr>
//         </table>
//       </div>

//       <!-- Footer -->
//       <div class="footer">
//         <table width="100%" border="0" cellspacing="0" cellpadding="0">
//           <tr>
//             <td align="center" style="padding-bottom:15px;">
//               <img src="https://yourdomain.com/logo-icon-white.png" alt="NFAS Thinker" width="40" style="opacity:0.8;">
//             </td>
//           </tr>
//           <tr>
//             <td align="center" style="padding-bottom:15px;">
//               <p style="margin:0; font-size:12px; color:#bdc3c7;">Transforming complex challenges into elegant digital solutions</p>
//             </td>
//           </tr>
//           <tr>
//             <td align="center" style="padding-bottom:20px;">
//               <a href="#" style="margin:0 10px;"><img src="https://yourdomain.com/social-twitter.png" width="24" alt="Twitter"></a>
//               <a href="#" style="margin:0 10px;"><img src="https://yourdomain.com/social-linkedin.png" width="24" alt="LinkedIn"></a>
//               <a href="#" style="margin:0 10px;"><img src="https://yourdomain.com/social-github.png" width="24" alt="GitHub"></a>
//             </td>
//           </tr>
//           <tr>
//             <td align="center" style="padding-bottom:5px;">
//               <p style="margin:0; font-size:11px;">© ${new Date().getFullYear()} NFAS Thinker Digital Solutions. All rights reserved.</p>
//             </td>
//           </tr>
//           <tr>
//             <td align="center">
//               <p style="margin:0; font-size:11px;">Douala, Cameroon | <a href="https://nfasthinker.com" style="color:#ecf0f1; text-decoration:none;">www.nfasthinker.com</a></p>
//             </td>
//           </tr>
//         </table>
//       </div>
//     </div>
//   </body>
//   </html>
//   `
// };

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
// function generateEmailSubject(formData) {
//   if (formData.engagementType === 'project') {
//     return `${formData.clientInfo.company ? formData.clientInfo.company + ' ' : ''}${formData.serviceSelection.serviceType} Project Confirmation`;
//   } else {
//     return `Employment Opportunity: ${formData.serviceSelection.employmentDetails.jobTitle || 'Role'} Discussion`;
//   }
// }

// // Master Email Generator
// function generateEmailHtml(formData) {
//   const isProject = formData.engagementType === 'project';
//   const serviceType = formData.serviceSelection.serviceType;
//   //const projectType = isProject ? formData.serviceSelection[`${serviceType.toLowerCase().replace(' ', '')}Details`]?.type : null;
// console.log("{generateEmailHtml formData}", {formData})
//   return `<!DOCTYPE html>
//   <html xmlns="http://www.w3.org/1999/xhtml">
//   <head>
//     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>${generateEmailSubject(formData)}</title>
//     <style>
//       /* [Previous CSS remains exactly the same] */
//     </style>
//   </head>
//   <body>
//     <div class="email-container">
//       <!-- Dynamic Header -->
//       <div class="header">
//         <table width="100%" border="0" cellspacing="0" cellpadding="0">
//           <tr>
//             <td align="center">
//               <img src="https://yourdomain.com/logo-white.png" alt="NFAS Thinker Logo" width="180">
//               <h1>${isProject ? 'Project Confirmation' : 'Employment Inquiry'}</h1>
//               <p>${generateHeaderSubtitle(formData)}</p>
//             </td>
//           </tr>
//         </table>
//       </div>

//       <div class="content">
//         <!-- Personalized Greeting -->
//         <h2>Sender ${formData.clientInfo.firstName} ${formData.clientInfo.lastName},</h2>
//         <p>${generateOpeningParagraph(formData)}</p>

//         ${
//          isProject ? generateProjectDetails(formData) : generateEmploymentDetails(formData)
//         }

//         ${formData.projectInfo.notes ? `
//         <div style="background:#fff8e1; padding:20px; border-radius:4px; margin:25px 0;">
//           <h3 style="margin-top:0; color:#ff8f00;">${isProject ? 'Your Vision' : 'Opportunity Details'}</h3>
//           <p style="font-style:italic; margin-bottom:0;">"${formData.projectInfo.notes}"</p>
//         </div>
//         ` : ''}

//         <!-- Next Steps -->
//         <h3>Next Steps</h3>
//         <ol style="margin-top:15px; padding-left:20px;">
//           ${generateNextSteps(formData).map(step => `<li style="margin-bottom:10px;">${step}</li>`).join('')}
//         </ol>

//         <!-- CTA Buttons -->
//         <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:30px 0;">
//           <tr>
//             <td align="center">
//               <table border="0" cellspacing="0" cellpadding="0">
//                 <tr>
//                   <td align="center" style="padding:0 10px;">
//                     <a href="https://calendly.com/nfasthinker/consultation" class="btn">
//                       ${isProject ? 'Schedule Discovery Call' : 'Schedule Interview'}
//                     </a>
//                   </td>
//                   <td align="center" style="padding:0 10px;">
//                     <a href="https://nfasthinker.com/client-portal" class="btn btn-outline">
//                       ${isProject ? 'Access Client Portal' : 'View Open Positions'}
//                     </a>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>
//         </table>

//         <!-- Signature -->
//         <div class="divider"></div>
//         ${generateSignature()}
//       </div>

//       <!-- Footer -->
//       ${generateFooter()}
//     </div>
//   </body>
//   </html>`;
// }

// // Helper Functions
// function generateHeaderSubtitle(formData) {
//   if (formData.engagementType === 'project') {
//     const service = formData.serviceSelection.serviceType;
//     const type = formData.serviceSelection[`${service.toLowerCase().replace(' ', '')}Details`]?.type;
//     return `${formData.clientInfo.company || ''}${formData.clientInfo.company ? ' • ' : ''}${type ? type + ' ' : ''}${service}`;
//   } else {
//     return `Employment Opportunity • ${formData.serviceSelection.employmentDetails.jobTitle || 'Role'}`;
//   }
// }

// function generateOpeningParagraph(formData) {
//   if (formData.engagementType === 'project') {
//     const service = formData.serviceSelection.serviceType;
//     return `Thank you for entrusting NFAS Thinker with your ${service} project. We're excited to collaborate on your vision and have prepared this comprehensive confirmation.`;
//   } else {
//     return `Thank you for considering me for the ${formData.serviceSelection.employmentDetails.jobTitle || ''} position. I'm honored by the opportunity and have reviewed the details you provided.`;
//   }
// }

// function generateProjectDetails(formData) {
//   const service = formData.serviceSelection.serviceType;
//   const ServiceType = service.split(" ")[0];
//   const details = formData.serviceSelection[`${service.toLowerCase().split(" ")[0]}Details`];
// console.log("{Service details}", {formData, service, details})
//   return `
//   <!-- Project Timeline -->
//   <div style="margin:30px 0;">
//     <p style="margin-bottom:8px; font-weight:500; color:#6c757d;">PROJECT TIMELINE</p>
//     <div class="timeline-bar">
//       <div class="timeline-progress"></div>
//     </div>
//     <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
//       <tr>
//         <td style="width:33%; text-align:left; font-size:12px; color:#6c757d;">
//           Initiation<br>${new Date(formData.projectInfo.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//         </td>
//         <td style="width:33%; text-align:center; font-size:12px; color:#6c757d;">Development</td>
//         <td style="width:33%; text-align:right; font-size:12px; color:#6c757d;">
//           Delivery<br>${new Date(formData.projectInfo.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//         </td>
//       </tr>
//     </table>
//   </div>

//   <!-- Project Details Card -->
//   <div class="project-card">
//     <h3 style="margin-top:0; color:#1976d2;">Project Specifications</h3>

//     <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:15px 0;">
//       <tr>
//         <td width="40%" style="padding-bottom:10px; color:#6c757d;">Service Type:</td>
//         <td width="60%" style="padding-bottom:10px; font-weight:500;">${service}</td>
//       </tr>
//       ${details.type ? `
//       <tr>
//         <td style="padding-bottom:10px; color:#6c757d;">${service.includes('Website') ? 'Website' : 'Application'} Type:</td>
//         <td style="padding-bottom:10px; font-weight:500;">${details.type}</td>
//       </tr>
//       ` : ''}
//       <tr>
//         <td style="padding-bottom:10px; color:#6c757d;">Budget Range:</td>
//         <td style="padding-bottom:10px; font-weight:500;">${formData.projectInfo.budgetRange}</td>
//       </tr>
//       <tr>
//         <td style="padding-bottom:10px; color:#6c757d;">Urgency Level:</td>
//         <td style="padding-bottom:10px; font-weight:500;">${formData.projectInfo.urgency}</td>
//       </tr>
//       <tr>
//         <td style="padding-bottom:10px; color:#6c757d;">Contact Method:</td>
//         <td style="padding-bottom:10px; font-weight:500;">${formData.clientInfo.contactMethod}</td>
//       </tr>
//     </table>

//     ${generateFeaturesSection(formData, service, details)}
//   </div>`;
// }

// function generateFeaturesSection(formData, service, details) {
//   const featureType = service.includes('Website') ? 'Pages' : 'Screens';
//   const defaultFeatures = details.defaultPages || details.defaultScreens || [];
//   const additionalFeatures = details.additionalPages || details.additionalScreens || [];

//   return `
//   ${defaultFeatures.length > 0 ? `
//   <p style="margin-bottom:5px; color:#6c757d;">Core ${featureType} Included:</p>
//   <div style="margin-bottom:15px;">
//     ${defaultFeatures.map(item => `
//       <span class="feature-badge">${item}</span>
//     `).join('')}
//   </div>
//   ` : ''}

//   ${additionalFeatures.length > 0 ? `
//   <p style="margin-bottom:5px; color:#6c757d;">Premium Add-ons Selected:</p>
//   <div>
//     ${additionalFeatures.map(item => `
//       <span class="feature-badge" style="background:#e8f5e9; color:#2e7d32;">${item}</span>
//     `).join('')}
//   </div>
//   ` : ''}

//   ${details.needs && details.needs.length > 0 ? `
//   <p style="margin-bottom:5px; color:#6c757d;">Technical Requirements:</p>
//   <div>
//     ${details.needs.map(item => `
//       <span class="feature-badge" style="background:#e3f2fd; color:#1976d2;">${item}</span>
//     `).join('')}
//   </div>
//   ` : ''}`;
// }

// function generateEmploymentDetails(formData) {
//   const details = formData.serviceSelection.employmentDetails;

//   return `
//   <div class="project-card">
//     <h3 style="margin-top:0; color:#1976d2;">Opportunity Details</h3>

//     <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:15px 0;">
//       ${details.jobTitle ? `
//       <tr>
//         <td width="40%" style="padding-bottom:10px; color:#6c757d;">Position Title:</td>
//         <td width="60%" style="padding-bottom:10px; font-weight:500;">${details.jobTitle}</td>
//       </tr>
//       ` : ''}

//       ${details.roleType ? `
//       <tr>
//         <td style="padding-bottom:10px; color:#6c757d;">Employment Type:</td>
//         <td style="padding-bottom:10px; font-weight:500;">${details.roleType}</td>
//       </tr>
//       ` : ''}

//       ${details.industry ? `
//       <tr>
//         <td style="padding-bottom:10px; color:#6c757d;">Industry:</td>
//         <td style="padding-bottom:10px; font-weight:500;">${details.industry}</td>
//       </tr>
//       ` : ''}

//       ${details.salaryExpectation ? `
//       <tr>
//         <td style="padding-bottom:10px; color:#6c757d;">Compensation:</td>
//         <td style="padding-bottom:10px; font-weight:500;">${details.salaryExpectation}</td>
//       </tr>
//       ` : ''}

//       <tr>
//         <td style="padding-bottom:10px; color:#6c757d;">Contact Method:</td>
//         <td style="padding-bottom:10px; font-weight:500;">${formData.clientInfo.contactMethod}</td>
//       </tr>
//     </table>

//     ${details.jobDescription ? `
//     <p style="margin-bottom:5px; color:#6c757d;">Position Overview:</p>
//     <p>${details.jobDescription}</p>
//     ` : ''}
//   </div>`;
// }

// function generateNextSteps(formData) {
//   if (formData.engagementType === 'project') {
//     return [
//       `Our team will conduct an in-depth analysis within 24-48 hours`,
//       `We'll schedule a ${formData.clientInfo.contactMethod} consultation at your convenience`,
//       `You'll receive a detailed project blueprint with milestones and deliverables`
//     ];
//   } else {
//     return [
//       `I will review the opportunity details and my qualifications`,
//       `We'll schedule a ${formData.clientInfo.contactMethod} discussion at your convenience`,
//       `You'll receive my formal response and availability timeline`
//     ];
//   }
// }

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
//       </tr>
//       <tr>
//         <td align="center">
//           <p style="margin:0; font-size:11px;">Douala, Cameroon | <a href="https://nfasthinker.com" style="color:#ecf0f1; text-decoration:none;">www.nfasthinker.com</a></p>
//         </td>
//       </tr>
//     </table>
//   </div>`;
// }
try {
   
   
} catch (error) {
          console.log(" error ContactInforb error", error);
        return res.json({
            success: false,
            data: error,
        })
}

     const sender =  await transporter.sendMail(mailOptions);
   
     console.log(" error ContactInforb req.bodyrrrrr", req.body, "sender",sender);

     if(sender.rejected.length > 0 && sender.accepted.length === 0) {
         return res.json({
            success: false,
            data: 'Failed To Send Email',
        })
     }
    else {
        
      res.json({ success: true, message: 'Contact email sent successfully' });
     const ContactInfor = await Contact.create(req.body);
     console.log("ContactInfor", ContactInfor);

     return res.json({
            success: true,
            data: ContactInfor,
        })


     }
     
    } catch (error) {
         console.log(" error ContactInforb error", error);
        return res.json({
            success: false,
            data: error,
        })

    }








    } else if (method === "GET") {
          if (req.query?.id) {
            const blogDoc = await Contact.findById(req.query?.id);

            if (blogDoc) {
                return res.json({
                    success: true,
                    data: blogDoc,
                    message: ""
                })
            }
         else{
            return res.json({
                success: false,
                data: null,
                message: "failed to get blog document, verify blog id"
            })
         }

          } else {

            const Doc = (await Contact.find()).reverse();

            return res.json({
                success: true,
                 data: Doc,
                 message: ""
            })

          }
    }

    else if (method === "PUT"){
        const {_id,  name, lname, email, price, company, country, description, phone, project} = req.body;
        if (!_id) {
            return res.json({
                success: false,
                message: "Error! _Id Missing",

            })
        }
        else{
            await Contact.updateOne({_id}, {
                name, lname, email, price, company, country, description, phone, project
            })

            return res.json({
                success: true,
                message: "_Id Missing",

            })
        }
    }

    else if (method === "DELETE"){
        if (req.query?.id) {
            await Contact.deleteOne(req.query?.id);

            return res.json({
                success: true,
                message: "",

            })

          } else {

            return res.json({
                success: false,
                message: "Failed to delete blog",

            })

          }
    }

}