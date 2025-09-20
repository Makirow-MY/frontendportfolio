"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handlecont;

var _mongoose = require("@/lib/mongoose");

var _contact = require("@/models/contact");

var _serverless = require("@neondatabase/serverless");

var _uuid = require("uuid");

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n        INSERT INTO notifications (\n        type, model, dataid, title, message, createddate, read, createdat, updatedat\n        )\n        VALUES (\n          'add', 'Contact', ", ", 'Contact Inquiry Received',\n          ", ",\n           CURRENT_TIMESTAMP, FALSE,\n          CURRENT_TIMESTAMP, CURRENT_TIMESTAMP\n        )\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["SELECT * FROM contacts WHERE id = ", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        INSERT INTO contacts (\n          id, first_name, last_name, email, phone, company, country, notes, budget_range,\n          engagement_type, profile_picture, referral_source, contact_method, service_type,\n          website_type, website_description, website_default_pages, website_additional_pages,\n          app_type, app_description, app_default_screens, app_additional_screens,\n          design_type, design_description, database_needs, telecom_needs, telecom_description,\n          employment_role_type, employment_job_title, employment_industry,\n          employment_salary_expectation, employment_job_description, start_date, deadline,\n          urgency, createdat, updatedat\n        )\n        VALUES (\n          ", ", ", ", ", ", ", ", ", ", ", ", ", ",\n          ", ", ", ", ", ", ", ", ", ",\n          ", ", ", ", ", ", ", ",\n          ", ", ", ", ", ",\n          ", ", ", ", ", ",\n          ", ", ", ", ", ",\n          ", ", ", ", ", ", ", ",\n          ", ", ", ", ", ", ", ", ", ",\n          ", ", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP\n        )\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var nodemailer = require('nodemailer');

var sql = (0, _serverless.neon)('postgresql://neondb_owner:npg_P6GLxeoWFS5u@ep-curly-heart-ae2jb0gb-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'); // Use process.env.DATABASE_URL if needed

var formatDate = function formatDate(date) {
  if (!date || isNaN(date)) {
    return '';
  }

  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: true
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

function handlecont(req, res) {
  var method, transporter, generateEmailSubject, generateHeaderSubtitle, generateOpeningParagraph, generateProjectDetails, calculateProjectDuration, generateFeaturesSection, generateEmploymentDetails, generateNextSteps, generateClientNotes, generateSignature, generateFooter, generateEmailHtml, mailOptions, sender, _req$body, _req$body$clientInfo, firstName, lastName, profilePicture, email, phone, company, country, referralSource, contactMethod, engagementType, _req$body$serviceSele, serviceType, _req$body$serviceSele2, websiteType, websiteDescription, defaultPages, additionalPages, _req$body$serviceSele3, appType, appDescription, defaultScreens, additionalScreens, _req$body$serviceSele4, designType, designDescription, databaseNeeds, _req$body$serviceSele5, telecomNeeds, telecomDescription, _req$body$serviceSele6, roleType, jobTitle, industry, salaryExpectation, jobDescription, _req$body$projectInfo, startDate, deadline, budgetRange, notes, urgency, contactId, createdAt, updatedAt, _ref, _ref2, newContact, ContactInfor;

  return regeneratorRuntime.async(function handlecont$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          method = req.method; // Email configuration

          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'nfasthinker@gmail.com',
              pass: 'fdnl qebj scyz brpu'
            }
          });

          if (!(method === "POST")) {
            _context.next = 47;
            break;
          }

          _context.prev = 3;

          // 
          generateEmailSubject = function generateEmailSubject(formData) {
            if (formData.engagementType === 'project') {
              return "New Project Inquiry: ".concat(formData.serviceSelection.serviceType, " | ").concat(formData.clientInfo.company || formData.clientInfo.firstName);
            } else {
              return "Employment Opportunity: ".concat(formData.serviceSelection.employmentDetails.jobTitle || 'Technical Role');
            }
          };

          generateHeaderSubtitle = function generateHeaderSubtitle(formData) {
            if (formData.engagementType === 'project') {
              return "".concat(formData.clientInfo.company ? 'From ' + formData.clientInfo.company : 'Personal Project', " \u2022 ").concat(formData.serviceSelection.serviceType);
            } else {
              var details = formData.serviceSelection.employmentDetails;
              return "".concat(details.company || 'Company', " \u2022 ").concat(details.jobTitle || 'Technical Position', " \u2022 ").concat(details.roleType || 'Full-time');
            }
          };

          generateOpeningParagraph = function generateOpeningParagraph(formData) {
            var client = "".concat(formData.clientInfo.firstName, " ").concat(formData.clientInfo.lastName);
            var contact = formData.clientInfo.contactMethod === 'Email' ? "You can respond directly to <span> ".concat(formData.clientInfo.email, "</span>") : "<b>Preferred contact method:</b> <span> ".concat(formData.clientInfo.contactMethod, " (").concat(formData.clientInfo.phone, ") <span>");

            if (formData.engagementType === 'project') {
              return "\n    <p>You've received a detailed project inquiry from <b> ".concat(client, " </b> regarding <span> ").concat(formData.serviceSelection.serviceType, " services </span>.\n    </br> \n    ").concat(contact, ". The client discovered your work through <span> ").concat(formData.clientInfo.referralSource || 'direct search', "</span>.</p>\n   \n    <p>Below you'll find comprehensive details about the project requirements, timeline, and client expectations:</p>");
            } else {
              return "\n    <p><b> ".concat(client, " </b> has reached out regarding a <span> ").concat(formData.serviceSelection.employmentDetails.jobTitle || 'technical position', " </span> opportunity. \n    </br>").concat(contact, ". This inquiry came through <span> ").concat(formData.clientInfo.referralSource || 'your professional network', "</span>.</p>\n    <p>The complete position details and requirements are outlined below:</p>");
            }
          };

          generateProjectDetails = function generateProjectDetails(formData) {
            var service = formData.serviceSelection.serviceType;
            var details = formData.serviceSelection["".concat(service.toLowerCase().split(" ")[0], "Details")];
            var timeline = "\n    <tr>\n      <td width=\"30%\">Project Start</td>\n      <td width=\"70%\"><strong>".concat(new Date(formData.projectInfo.startDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }), "</strong></td>\n    </tr>\n    <tr>\n      <td>Expected Completion</td>\n      <td><strong>").concat(new Date(formData.projectInfo.deadline).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }), "</strong></td>\n    </tr>\n    <tr>\n      <td>Total Duration</td>\n      <td><strong>").concat(calculateProjectDuration(formData.projectInfo.startDate, formData.projectInfo.deadline), "</strong></td>\n    </tr>");
            return "\n  <div style=\"margin:40px 0;\">\n    <h3 style=\"color:#2c3e50;border-bottom:1px solid #eee;padding-bottom:8px;\">Project Overview</h3>\n    \n    <table width=\"100%\" style=\"margin:20px 0;border-collapse:collapse;\">\n      <tr>\n        <td width=\"30%\">Service Type</td>\n        <td width=\"70%\"><strong>".concat(service, "</strong></td>\n      </tr>\n      ").concat(details.type ? "\n      <tr>\n        <td>Project Type</td>\n        <td><strong>".concat(details.type, "</strong></td>\n      </tr>") : '', "\n      <tr>\n        <td>Budget Range</td>\n        <td><strong>").concat(formData.projectInfo.budgetRange, "</strong> (").concat(formData.projectInfo.urgency, ")</td>\n      </tr>\n    </table>\n\n    <h4 style=\"color:#e67e22;margin:25px 0 15px;\">Project Timeline</h4>\n    <table width=\"100%\" style=\"margin-bottom:25px;border-collapse:collapse;\">\n      ").concat(timeline, "\n    </table>\n\n    ").concat(generateFeaturesSection(formData, service, details), "\n  </div>");
          };

          calculateProjectDuration = function calculateProjectDuration(startDate, endDate) {
            var start = new Date(startDate);
            var end = new Date(endDate);
            var months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
            return months > 1 ? "".concat(months, " months") : "".concat(Math.round((end - start) / (1000 * 60 * 60 * 24)), " days");
          };

          generateFeaturesSection = function generateFeaturesSection(formData, service, details) {
            var featuresHtml = '';
            var featureSections = [{
              title: 'Core Requirements',
              items: details.defaultPages || details.defaultScreens || [],
              style: 'background:#f8f9fa;color:#2c3e50;border:1px solid #ddd;'
            }, {
              title: 'Premium Add-ons',
              items: details.additionalPages || details.additionalScreens || [],
              style: 'background:#e8f5e9;color:#2e7d32;border:1px solid #c8e6c9;'
            }, {
              title: 'Technical Specifications',
              items: details.needs || [],
              style: 'background:#e3f2fd;color:#1976d2;border:1px solid #bbdefb;'
            }];
            featureSections.forEach(function (section) {
              if (section.items.length > 0) {
                featuresHtml += "\n      <div style=\"margin-bottom:20px;\">\n        <h5 style=\"margin:0 0 10px;color:#7f8c8d;font-size:14px;text-transform:uppercase;\">".concat(section.title, "</h5>\n        <div>\n          ").concat(section.items.map(function (item) {
                  return "\n            <span style=\"display:inline-block;".concat(section.style, "padding:6px 12px;border-radius:4px;margin:0 8px 8px 0;font-size:13px;\">\n              ").concat(item, "\n            </span>\n          ");
                }).join(''), "\n        </div>\n      </div>");
              }
            });
            return featuresHtml;
          };

          generateEmploymentDetails = function generateEmploymentDetails(formData) {
            var details = formData.serviceSelection.employmentDetails;
            return "\n  <div style=\"margin:40px 0;\">\n    <h3 style=\"color:#2c3e50;border-bottom:1px solid #eee;padding-bottom:8px;\">Opportunity Details</h3>\n    \n    <table width=\"100%\" style=\"margin:20px 0;border-collapse:collapse;\">\n      ".concat(details.jobTitle ? "\n      <tr>\n        <td width=\"30%\">Position Title</td>\n        <td width=\"70%\"><strong>".concat(details.jobTitle, "</strong></td>\n      </tr>") : '', "\n      <tr>\n        <td>Employment Type</td>\n        <td><strong>").concat(details.roleType || 'Not specified', "</strong></td>\n      </tr>\n      ").concat(details.company ? "\n      <tr>\n        <td>Company</td>\n        <td><strong>".concat(details.company, "</strong></td>\n      </tr>") : '', "\n      ").concat(details.industry ? "\n      <tr>\n        <td>Industry</td>\n        <td><strong>".concat(details.industry, "</strong></td>\n      </tr>") : '', "\n      ").concat(details.salaryExpectation ? "\n      <tr>\n        <td>Compensation</td>\n        <td><strong>".concat(details.salaryExpectation, "</strong></td>\n      </tr>") : '', "\n    </table>\n\n    ").concat(details.jobDescription ? "\n    <h4 style=\"color:#e67e22;margin:25px 0 15px;\">Position Overview</h4>\n    <div style=\"background:#f8f9fa;padding:15px;border-radius:4px;border-left:3px solid #e67e22;\">\n      <p style=\"margin:0;\">".concat(details.jobDescription, "</p>\n    </div>") : '', "\n  </div>");
          };

          generateNextSteps = function generateNextSteps(formData) {
            var steps = formData.engagementType === 'project' ? ['Review all project specifications and client background information', 'Evaluate resource availability and timeline feasibility', 'Prepare preliminary questions for discovery discussion', 'Draft initial proposal with scope, timeline, and cost estimates'] : ['Review the position requirements and company information', 'Assess fit with current professional commitments', 'Prepare relevant work samples and qualifications', 'Draft response with availability for further discussions'];
            return steps.map(function (step) {
              return "<li style=\"margin-bottom:12px;padding-left:5px;\">".concat(step, "</li>");
            }).join('');
          };

          generateClientNotes = function generateClientNotes(notes) {
            if (!notes) return '';
            return "\n  <div style=\"background:#f8f9fa;border-left:4px solid #e67e22;padding:20px;margin:30px 0;border-radius:0 4px 4px 0;\">\n    <h4 style=\"margin-top:0;color:#e67e22;\">Client's Vision Statement</h4>\n    <blockquote style=\"margin:0;font-style:italic;color:#555;border-left:2px solid #ddd;padding-left:15px;\">\n      ".concat(notes, "\n    </blockquote>\n  </div>");
          };

          generateSignature = function generateSignature() {
            return "\n  <div style=\"margin-top:40px;padding-top:30px;border-top:1px solid #eee;\">\n    <table width=\"100%\">\n      <tr>\n        <td width=\"80\" style=\"vertical-align:top;padding-right:20px;\">\n          <img src=\"https://yourdomain.com/signature-photo.jpg\" width=\"80\" style=\"border-radius:50%;\">\n        </td>\n        <td style=\"vertical-align:top;\">\n          <p style=\"margin:0 0 5px;font-size:18px;color:#2c3e50;font-weight:600;\">Your Name</p>\n          <p style=\"margin:0 0 5px;color:#7f8c8d;\">Principal Architect & Founder</p>\n          <p style=\"margin:0 0 5px;color:#7f8c8d;\">Your Company Name</p>\n          <p style=\"margin:10px 0 0;\">\n            <a href=\"tel:+1234567890\" style=\"color:#e67e22;text-decoration:none;\">+1 (234) 567-890</a> \u2022 \n            <a href=\"mailto:you@yourdomain.com\" style=\"color:#e67e22;text-decoration:none;\">you@yourdomain.com</a>\n          </p>\n        </td>\n      </tr>\n    </table>\n  </div>";
          };

          generateFooter = function generateFooter() {
            return "\n  <div style=\"background:#2c3e50;color:#fff;padding:40px 20px;text-align:center;margin-top:40px;\">\n    <img src=\"https://yourdomain.com/logo-white.png\" width=\"120\" style=\"margin-bottom:20px;\">\n    <p style=\"margin:0 0 15px;font-size:14px;color:#bdc3c7;\">\n      Transforming complex challenges into elegant digital solutions since 1999\n    </p>\n    <div style=\"margin:20px 0;\">\n      <a href=\"#\" style=\"margin:0 10px;\"><img src=\"https://yourdomain.com/social-twitter.png\" width=\"24\" alt=\"Twitter\"></a>\n      <a href=\"#\" style=\"margin:0 10px;\"><img src=\"https://yourdomain.com/social-linkedin.png\" width=\"24\" alt=\"LinkedIn\"></a>\n      <a href=\"#\" style=\"margin:0 10px;\"><img src=\"https://yourdomain.com/social-github.png\" width=\"24\" alt=\"GitHub\"></a>\n    </div>\n    <p style=\"margin:10px 0 0;font-size:12px;color:#bdc3c7;\">\n      \xA9 ".concat(new Date().getFullYear(), " Your Company Name. All rights reserved.<br>\n      123 Tech Avenue, Silicon Valley, CA 94107 | <a href=\"https://yourdomain.com\" style=\"color:#ecf0f1;\">yourdomain.com</a>\n    </p>\n  </div>");
          };

          generateEmailHtml = function generateEmailHtml(formData) {
            return "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>".concat(generateEmailSubject(formData), "</title>\n  <style>\n    body {\n      margin: 0;\n      padding: 0;\n      font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n      line-height: 1.6;\n      color: #333;\n      background-color: #f5f5f5;\n    }\n    .email-container {\n      max-width: 700px;\n      margin: 0 auto;\n      background: #fff;\n      box-shadow: 0 5px 30px rgba(0,0,0,0.1);\n    }\n    .header {\n      background: linear-gradient(135deg, #2c3e50 0%, #1a2530 100%);\n      color: white;\n      padding: 50px 20px;\n      text-align: center;\n      border-bottom: 5px solid #e67e22;\n    }\n    .header h1 {\n      margin: 20px 0 10px;\n      font-size: 28px;\n      font-weight: 300;\n      text-transform: capitalize;\n    }\n    .header p {\n      margin: 0;\n      font-size: 16px;\n      opacity: 0.9;\n       text-transform: capitalize;\n       font-weight: 400;\n    }\n    .content {\n      padding: 50px;\n    }\n    h2 {\n      color: #2c3e50;\n      font-size: 24px;\n       text-transform: capitalize;\n      margin-top: 0;\n      margin-bottom: 25px;\n      padding-bottom: 15px;\n      border-bottom: 1px solid #eee;\n    }\n    h3 {\n      color: #2c3e50;\n      font-size: 20px;\n       text-transform: capitalize;\n      margin: 35px 0 20px;\n    }\n    h4 {\n      color: #e67e22;\n      font-size: 16px;\n      margin: 25px 0 15px;\n    }\n      span {\n      color: #e67e22;\n      \n    }\n    table {\n      width: 100%;\n      border-collapse: collapse;\n    }\n    td {\n      padding: 8px 0;\n      vertical-align: top;\n    }\n    .btn {\n      display: inline-block;\n      padding: 12px 25px;\n      background: #e67e22;\n      color: white;\n      text-decoration: none;\n      border-radius: 4px;\n      font-weight: 500;\n      margin: 10px 5px;\n    }\n    .btn-outline {\n      background: transparent;\n      border: 2px solid #e67e22;\n      color: #e67e22;\n    }\n    @media (max-width: 600px) {\n      .content {\n        padding: 30px;\n      }\n    }\n  </style>\n</head>\n<body>\n  <div class=\"email-container\">\n    <div class=\"header\">\n      <h1>").concat(formData.engagementType === 'project' ? 'New Project Inquiry' : 'Employment Opportunity', "</h1>\n      <p>").concat(generateHeaderSubtitle(formData), "</p>\n    </div>\n\n    <div class=\"content\">\n      <h2>Detailed Inquiry from ").concat(formData.clientInfo.firstName, " ").concat(formData.clientInfo.lastName, "</h2>\n      \n      ").concat(generateOpeningParagraph(formData), "\n      \n      ").concat(formData.engagementType === 'project' ? generateProjectDetails(formData) : generateEmploymentDetails(formData), "\n      \n      ").concat(generateClientNotes(formData.projectInfo.notes), "\n      \n      <h3>Recommended Next Steps</h3>\n      <ol style=\"margin:20px 0 30px;padding-left:25px;\">\n        ").concat(generateNextSteps(formData), "\n      </ol>\n\n      <div style=\"text-align:center;margin:40px 0 30px;\">\n        <a href=\"https://calendly.com/yourusername/consultation\" class=\"btn\">\n          ").concat(formData.engagementType === 'project' ? 'Schedule Discovery Call' : 'Schedule Interview', "\n        </a>\n        <a href=\"https://yourdomain.com/dashboard\" class=\"btn btn-outline\">\n          View Client Portal\n        </a>\n      </div>\n\n      ").concat(generateSignature(), "\n    </div>\n\n    ").concat(generateFooter(), "\n  </div>\n</body>\n</html>");
          }; // function generateSignature() {
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


          mailOptions = {
            from: "\"MYGL Tech | Digital Solutions\"  <nfasthinker@gmail.com>",
            to: 'computerengineermakia@gmail.com',
            subject: generateEmailSubject(req.body),
            html: generateEmailHtml(req.body)
          };
          _context.next = 19;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions));

        case 19:
          sender = _context.sent;
          console.log(" error ContactInforb req.bodyrrrrr", req.body, "sender", sender);

          if (!(sender.rejected.length > 0 && sender.accepted.length === 0)) {
            _context.next = 25;
            break;
          }

          return _context.abrupt("return", res.json({
            success: false,
            data: 'Failed To Send Email'
          }));

        case 25:
          _req$body = req.body, _req$body$clientInfo = _req$body.clientInfo, firstName = _req$body$clientInfo.firstName, lastName = _req$body$clientInfo.lastName, profilePicture = _req$body$clientInfo.profilePicture, email = _req$body$clientInfo.email, phone = _req$body$clientInfo.phone, company = _req$body$clientInfo.company, country = _req$body$clientInfo.country, referralSource = _req$body$clientInfo.referralSource, contactMethod = _req$body$clientInfo.contactMethod, engagementType = _req$body.engagementType, _req$body$serviceSele = _req$body.serviceSelection, serviceType = _req$body$serviceSele.serviceType, _req$body$serviceSele2 = _req$body$serviceSele.websiteDetails, websiteType = _req$body$serviceSele2.type, websiteDescription = _req$body$serviceSele2.customDescription, defaultPages = _req$body$serviceSele2.defaultPages, additionalPages = _req$body$serviceSele2.additionalPages, _req$body$serviceSele3 = _req$body$serviceSele.appDetails, appType = _req$body$serviceSele3.type, appDescription = _req$body$serviceSele3.customDescription, defaultScreens = _req$body$serviceSele3.defaultScreens, additionalScreens = _req$body$serviceSele3.additionalScreens, _req$body$serviceSele4 = _req$body$serviceSele.designDetails, designType = _req$body$serviceSele4.type, designDescription = _req$body$serviceSele4.customDescription, databaseNeeds = _req$body$serviceSele.databaseDetails.needs, _req$body$serviceSele5 = _req$body$serviceSele.telecomDetails, telecomNeeds = _req$body$serviceSele5.needs, telecomDescription = _req$body$serviceSele5.customDescription, _req$body$serviceSele6 = _req$body$serviceSele.employmentDetails, roleType = _req$body$serviceSele6.roleType, jobTitle = _req$body$serviceSele6.jobTitle, industry = _req$body$serviceSele6.industry, salaryExpectation = _req$body$serviceSele6.salaryExpectation, jobDescription = _req$body$serviceSele6.jobDescription, _req$body$projectInfo = _req$body.projectInfo, startDate = _req$body$projectInfo.startDate, deadline = _req$body$projectInfo.deadline, budgetRange = _req$body$projectInfo.budgetRange, notes = _req$body$projectInfo.notes, urgency = _req$body$projectInfo.urgency;
          contactId = (0, _uuid.v4)();
          createdAt = new Date();
          updatedAt = new Date();
          _context.next = 31;
          return regeneratorRuntime.awrap(sql(_templateObject(), contactId, firstName, lastName, email, phone, company, country, notes, budgetRange, engagementType, profilePicture, referralSource, contactMethod, serviceType, websiteType, websiteDescription, JSON.stringify(defaultPages), JSON.stringify(additionalPages), appType, appDescription, JSON.stringify(defaultScreens), JSON.stringify(additionalScreens), designType, designDescription, JSON.stringify(databaseNeeds), JSON.stringify(telecomNeeds), telecomDescription, roleType, jobTitle, industry, salaryExpectation, jobDescription, startDate, deadline, urgency));

        case 31:
          _context.next = 33;
          return regeneratorRuntime.awrap(sql(_templateObject2(), contactId));

        case 33:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          newContact = _ref2[0];
          _context.next = 38;
          return regeneratorRuntime.awrap(sql(_templateObject3(), contactId, "User ".concat(firstName, ", ").concat(lastName, " (email: ").concat(email, ", phone: ").concat(phone, ") submitted a contact inquiry the website on ").concat(formatDate(new Date()), ". Reply Method: \"").concat(contactMethod, "\", Service Type: \"").concat(serviceType, "\", Engagement Type: \"").concat(engagementType, "\". Allocate resources for response to optimize opportunity conversion")));

        case 38:
          ContactInfor = {
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
          return _context.abrupt("return", res.json({
            success: true,
            data: ContactInfor,
            message: 'Contact email sent successfully'
          }));

        case 41:
          _context.next = 47;
          break;

        case 43:
          _context.prev = 43;
          _context.t0 = _context["catch"](3);
          console.log(" error ContactInforb error", _context.t0);
          return _context.abrupt("return", res.json({
            success: false,
            data: _context.t0
          }));

        case 47:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 43]]);
}