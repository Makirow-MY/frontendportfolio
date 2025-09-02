import Head from 'next/head';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TermsOfService = () => {
   const [activeSection, setActiveSection] = useState("introduction");
  const [accepted, setAccepted] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const { t } = useTranslation();
  const scrollToSection = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const tabs = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'usage', label: 'Acceptable Use' },
    { id: 'service-agreements', label: 'Service Agreements' },
    { id: 'content', label: 'Content Policy' },
    { id: 'intellectual-property', label: 'Intellectual Property' },
    { id: 'liability', label: 'Limitation of Liability' },
    { id: 'termination', label: 'Termination' },
    { id: 'dispute-resolution', label: 'Dispute Resolution' },
    { id: 'governing', label: 'Governing Law' },
    { id: 'changes', label: 'Changes to Terms' },
  ];

  const handleAccept = () => {
    setAccepted(true);
    // Store acceptance in localStorage for persistence
    localStorage.setItem('termsAccepted', 'true');
    alert('Thank you for accepting the MYG Tech Terms of Service!');
  };

  useEffect(()=>{
const termacc =  localStorage.getItem('termsAccepted');
if (termacc == 'true') {
   setAccepted(true);
}
  },[accepted])

  const handleMouseMove = (e) => {
    setGlowPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <>
     <Head>
                <title>{t('header.brand')} - {t("terms.title")}</title>
          </Head>

       <div className="policy-content" onMouseMove={handleMouseMove}>
      <div
        className="footer-glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      ></div>
      <div className="policy-content__header" data-aos="fade-up" data-aos-delay="100">
        <h1>{t("terms.title")}</h1>
        <p className="policy-content__last-updated">
          Effective: {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        
      </div>

       <div className="terms-content__intro" data-aos="fade-up" data-aos-delay="200">
          <p>
            Welcome to MYG Tech, operated by Makia Yengue Godwill, a professional Computer Engineer offering web development, mobile development, UI/UX design, network administration, and video editing services. These Terms of Service ("Terms") govern your access to and use of our portfolio website, including all services, content, and interactions. By accessing or using our website, you agree to be legally bound by these Terms, which are designed to ensure a transparent, secure, and professional experience.
          </p>
          <div className={`terms-content__acceptance ${accepted ? 'accepted' : ''}`} data-aos="zoom-in" data-aos-delay="300">
            <p>I have read and agree to the MYG Tech Terms of Service:</p>
            <button
              onClick={handleAccept}
              disabled={accepted}
              className="terms-content__accept-btn"
            >
              {accepted ? '✓ Accepted' : 'Accept Terms'}
            </button>
          </div>
        </div>

      <div className="policy-content__container">
          <nav className="policy-content__sidebar" data-aos="fade-right" data-aos-delay="200">
          <ul>
            {[
              "introduction",
              "usage",
              "service-agreements",
              "content",
              "intellectual-property",
              "liability",
              "termination",
              "dispute-resolution",
              "governing",
              "changes",
            ].map((section, index) => (
              <li
                key={section}
                className={`policy-content__nav-item ${activeSection === section ? "active" : ""}`}
                onClick={() => scrollToSection(section)}
                data-aos="fade-up"
                data-aos-delay={300 + index * 50}
              >
                {section
                  .split("-")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")}
              </li>
            ))}
          </ul>
        </nav>

<div className="policy-content__main">
          {activeSection === "introduction" && (
            <section id="introduction" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>1. Introduction</h2>
              <div className="policy-content__section-content">
                <p>
                  These Terms of Service govern your use of the MYG Tech portfolio website, including all features such as contact forms, blog interactions, project inquiries, and payment processing for services like website development and UI/UX design. By accessing our website, you agree to comply with these Terms, our Privacy Policy, and all applicable laws, including those of Cameroon and international regulations such as GDPR and CCPA where relevant.
                </p>
                <p>
                  MYG Tech, operated by Makia Yengue Godwill, reserves the right to enforce these Terms to protect our intellectual property, ensure fair use, and maintain a secure environment for all users. Failure to comply may result in termination of access or legal action. Please review these Terms carefully, as they form a binding agreement between you and MYG Tech.
                </p>
                <p>
                  For clarity, "you" refers to any individual or entity accessing our website, including clients, visitors, or service inquirers. If you do not agree with these Terms, you must cease using the website immediately. For questions, refer to the Contact Information section.
                </p>
              </div>
            </section>
          )}

          {activeSection === "usage" && (
            <section id="usage" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>2. Acceptable Use</h2>
              <div className="policy-content__section-content">
                <p>
                  To ensure a safe and professional environment, you agree to use the MYG Tech website in accordance with the following rules and all applicable laws. Prohibited activities include, but are not limited to:
                </p>
                <ul>
                  <li>Engaging in unlawful activities, including fraud, hacking, or unauthorized access to our systems or data.</li>
                  <li>Harassing, threatening, or defaming others, including through blog comments or contact form submissions.</li>
                  <li>Transmitting viruses, malware, or any code that disrupts, damages, or interferes with the website’s functionality.</li>
                  <li>Collecting or harvesting user data (e.g., email addresses, comments) without explicit consent.</li>
                  <li>Interfering with the website’s operations, including through denial-of-service attacks or excessive automated requests.</li>
                  <li>Submitting false or misleading information via contact forms, blog comments, or payment processes.</li>
                  <li>Using automated tools (e.g., bots, scrapers) to access or extract content without permission.</li>
                </ul>
                <p>
                  Violation of these rules may result in immediate termination of access, legal action, or reporting to relevant authorities. We reserve the right to monitor website activity to enforce this policy and protect our users and services.
                </p>
                <p>
                  You agree to use the website solely for its intended purposes, such as exploring services, submitting inquiries, or engaging with blog content. Any misuse may lead to civil or criminal liability under applicable laws, including Cameroon’s cybercrime regulations.
                </p>
              </div>
            </section>
          )}

          {activeSection === "service-agreements" && (
            <section id="service-agreements" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>3. Service Agreements</h2>
              <div className="policy-content__section-content">
                <p>
                  MYG Tech offers professional services, including website development, mobile app development, UI/UX design, network administration, and video editing, as outlined in the Services Section of our website. By engaging our services, you agree to the following terms:
                </p>
                <ul>
                  <li>
                    <strong>Service Contracts</strong>: All service engagements require a written agreement (e.g., via email or signed contract) specifying scope, deliverables, timelines, and payment terms. These agreements are binding and governed by these Terms.
                  </li>
                  <li>
                    <strong>Payment Obligations</strong>: Payments for services must be made as agreed, typically via secure third-party processors (e.g., Stripe, PayPal). Invoices are issued upon project commencement, with payment due within 14 days unless otherwise specified.
                  </li>
                  <li>
                    <strong>Refunds</strong>: Refunds are processed within 14 days of a valid request, subject to our refund policy. Refunds may be denied for completed work or if the project scope was fulfilled. Contact us for details.
                  </li>
                  <li>
                    <strong>Client Responsibilities</strong>: You agree to provide accurate, timely information (e.g., project requirements, feedback) to ensure successful delivery. Delays or incomplete information may affect timelines or costs.
                  </li>
                  <li>
                    <strong>Ownership and Licensing</strong>: Upon full payment, you receive ownership or licensing rights to deliverables as specified in the service agreement. MYG Tech retains the right to showcase completed projects in our portfolio unless otherwise agreed.
                  </li>
                  <li>
                    <strong>Modifications</strong>: Changes to project scope require mutual agreement and may incur additional costs or timeline adjustments, documented in writing.
                  </li>
                </ul>
                <p>
                  Failure to comply with service agreements may result in project suspension or termination. We are committed to delivering high-quality services and resolving any issues promptly. For inquiries, refer to the Contact Information section.
                </p>
              </div>
            </section>
          )}

          {activeSection === "content" && (
            <section id="content" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>4. Content Policy</h2>
              <div className="policy-content__section-content">
                <p>
                  All content on the MYG Tech website, including text, images, project demos, blog posts, and UI/UX designs, is protected by intellectual property laws, including copyright and trademark laws of Cameroon and international treaties.
                </p>
                <div className="terms-content__permissions">
                  <h3>Permitted Uses:</h3>
                  <ul>
                    <li>View and interact with content for personal, non-commercial purposes (e.g., browsing projects, reading blogs).</li>
                    <li>Share links to our content (e.g., blog posts, project pages) with proper attribution to MYG Tech and a direct link to the original source.</li>
                    <li>Submit content (e.g., blog comments) in accordance with our Acceptable Use policy and Privacy Policy.</li>
                  </ul>
                  <h3>Prohibited Uses:</h3>
                  <ul>
                    <li>Republishing, reproducing, or redistributing content without written permission from MYG Tech.</li>
                    <li>Using content for commercial purposes without a valid license agreement.</li>
                    <li>Modifying, adapting, or creating derivative works from our content without authorization.</li>
                    <li>Removing or altering copyright notices, watermarks, or attribution from our content.</li>
                  </ul>
                </div>
                <p>
                  User-generated content (e.g., blog comments) remains your property, but by submitting it, you grant MYG Tech a non-exclusive, royalty-free, worldwide license to display, moderate, and store it for website functionality. For licensing inquiries or permission to use our content, contact us via the Contact Information section.
                </p>
                <p>
                  Violations of this policy may result in legal action, including claims for damages or injunctive relief. We actively monitor and protect our intellectual property rights to ensure fair use.
                </p>
              </div>
            </section>
          )}

          {activeSection === "intellectual-property" && (
            <section id="intellectual-property" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>5. Intellectual Property</h2>
              <div className="policy-content__section-content">
                <p>
                  MYG Tech owns or licenses all intellectual property on the website, including but not limited to source code, designs, graphics, blog content, project deliverables, and trademarks. This section provides detailed terms for intellectual property usage:
                </p>
                <ul>
                  <li>
                    <strong>Ownership</strong>: All website content, including React/Next.js code, UI/UX designs, and project assets, is owned by MYG Tech or licensed from third parties. Client deliverables are transferred or licensed upon full payment, as per the service agreement.
                  </li>
                  <li>
                    <strong>Trademarks</strong>: The MYG Tech name, logo, and related marks are proprietary. Use of these marks requires express written permission, except for linking to our website with attribution.
                  </li>
                  <li>
                    <strong>Licensing</strong>: Clients receive a non-exclusive, non-transferable license to use deliverables (e.g., websites, apps) for their intended purpose upon payment. MYG Tech retains the right to display deliverables in our portfolio unless otherwise agreed.
                  </li>
                  <li>
                    <strong>User Content</strong>: By submitting content (e.g., comments, project specifications), you warrant that you own or have rights to the content and grant MYG Tech a perpetual, worldwide, royalty-free license to use, display, and store it for website purposes.
                  </li>
                  <li>
                    <strong>Infringement</strong>: Unauthorized use of our intellectual property is prohibited and may result in legal action, including claims for damages or cessation of use. We respect third-party intellectual property and expect users to do the same.
                  </li>
                </ul>
                <p>
                  For licensing requests, permission to use our content, or to report intellectual property violations, please contact us. We are committed to protecting our intellectual property and resolving disputes promptly.
                </p>
              </div>
            </section>
          )}

          {activeSection === "liability" && (
            <section id="liability" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>6. Limitation of Liability</h2>
              <div className="policy-content__section-content">
                <p>
                  To the fullest extent permitted by law, MYG Tech, its owner, and affiliates limit liability for use of the website and services as follows:
                </p>
                <ul>
                  <li>
                    <strong>No Warranties</strong>: The website and services are provided “as is” and “as available” without warranties, express or implied, including for accuracy, completeness, or fitness for a particular purpose.
                  </li>
                  <li>
                    <strong>Indirect Damages</strong>: We are not liable for indirect, incidental, consequential, special, or punitive damages, including loss of profits, data, or goodwill, arising from website use or service delivery.
                  </li>
                  <li>
                    <strong>Third-Party Content</strong>: We are not responsible for third-party content, links, or services (e.g., payment processors, social media platforms), including their accuracy, security, or availability.
                  </li>
                  <li>
                    <strong>Technical Issues</strong>: We are not liable for website interruptions, data loss, or performance issues due to technical failures, maintenance, or force majeure events (e.g., cyberattacks, natural disasters).
                  </li>
                  <li>
                    <strong>Maximum Liability</strong>: Our total liability for any claim, whether in contract, tort, or otherwise, is limited to the amount paid by you for services in the preceding 12 months, if applicable.
                  </li>
                </ul>
                <div className="terms-content__disclaimer">
                  <p>
                    These limitations do not affect your statutory rights under applicable laws (e.g., GDPR, CCPA, Cameroon consumer protection laws). If any provision is found unenforceable, the remaining provisions remain in effect. For concerns, contact us via the Contact Information section.
                  </p>
                </div>
              </div>
            </section>
          )}

          {activeSection === "termination" && (
            <section id="termination" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>7. Termination</h2>
              <div className="policy-content__section-content">
                <p>
                  MYG Tech reserves the right to terminate or suspend your access to the website or services under the following conditions:
                </p>
                <ul>
                  <li>
                    <strong>Violation of Terms</strong>: Immediate termination for breaches of these Terms, including prohibited activities (see Acceptable Use) or non-payment of service fees.
                  </li>
                  <li>
                    <strong>Notice-Based Termination</strong>: Termination for any reason with 30 days’ written notice, sent via email or website notification, allowing you time to retrieve any relevant data (e.g., project details).
                  </li>
                  <li>
                    <strong>Serious Violations</strong>: Immediate termination without notice for severe violations, such as illegal activities, fraud, or threats to website security.
                  </li>
                  <li>
                    <strong>Service Discontinuation</strong>: Termination of specific services (e.g., project support) if mutually agreed terms are not met or if MYG Tech discontinues a service offering.
                  </li>
                </ul>
                <p>
                  Upon termination:
                </p>
                <ul>
                  <li>Your right to access the website or services ceases immediately.</li>
                  <li>User-generated content (e.g., comments) may be removed, subject to our Privacy Policy.</li>
                  <li>Provisions surviving termination (e.g., Intellectual Property, Limitation of Liability) remain in effect.</li>
                </ul>
                <p>
                  You may terminate your use of the website at any time by ceasing access. For service-related terminations, contact us to discuss project closure or data retrieval.
                </p>
              </div>
            </section>
          )}

          {activeSection === "dispute-resolution" && (
            <section id="dispute-resolution" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>8. Dispute Resolution</h2>
              <div className="policy-content__section-content">
                <p>
                  We are committed to resolving disputes fairly and efficiently. If you have concerns about these Terms, services, or website usage, please follow our dispute resolution process:
                </p>
                <ul>
                  <li>
                    <strong>Initial Contact</strong>: Contact us via the details in the Contact Information section to raise your concern. We will respond within 24 hours and aim to resolve issues within 7 business days.
                  </li>
                  <li>
                    <strong>Mediation</strong>: If unresolved, disputes may be submitted to mediation in Buea, Cameroon, conducted by a neutral third party in accordance with local laws and GDPR principles for EU users.
                  </li>
                  <li>
                    <strong>Legal Recourse</strong>: If mediation fails, disputes will be resolved in the courts of Buea, Cameroon, under Cameroon law, unless otherwise required by applicable regulations (e.g., GDPR for EU residents).
                  </li>
                  <li>
                    <strong>Class Action Waiver</strong>: You agree to resolve disputes individually, not as part of a class or collective action, to streamline resolution and reduce costs.
                  </li>
                  <li>
                    <strong>Regulatory Complaints</strong>: You may file a complaint with a supervisory authority (e.g., EU Data Protection Authorities, California Attorney General) if related to data rights. We will cooperate fully.
                  </li>
                </ul>
                <p>
                  All communications will be documented, and you will receive written confirmation of resolutions. For payment or service disputes, refer to the Service Agreements section. We aim to resolve issues amicably to maintain trust and professionalism.
                </p>
              </div>
            </section>
          )}

          {activeSection === "governing" && (
            <section id="governing" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>9. Governing Law</h2>
              <div className="policy-content__section-content">
                <p>
                  These Terms are governed by and construed in accordance with the laws of the Republic of Cameroon, without regard to its conflict of law principles. This ensures consistency with MYG Tech’s operations in Buea, Cameroon.
                </p>
                <p>
                  Any legal action or proceeding arising from these Terms or your use of the website will be resolved exclusively in the courts of Buea, Cameroon, unless otherwise required by applicable data protection laws (e.g., GDPR for EU residents). You agree to submit to the personal jurisdiction of these courts for such purposes.
                </p>
                <p>
                  If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect. This governing law clause survives termination of your access to the website.
                </p>
              </div>
            </section>
          )}

          {activeSection === "changes" && (
            <section id="changes" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>10. Changes to Terms</h2>
              <div className="policy-content__section-content">
                <p>
                  MYG Tech may revise these Terms to reflect changes in our services, legal requirements, or operational needs. We are committed to transparent updates and user notification:
                </p>
                <ul>
                  <li>
                    <strong>Notification</strong>: Significant changes will be communicated via website banners, pop-ups, or email to users who have provided contact details (e.g., via contact forms or blog comments).
                  </li>
                  <li>
                    <strong>Effective Date</strong>: The “Effective” date at the top of these Terms will be updated to reflect when changes take effect. Significant changes will be highlighted for 30 days.
                  </li>
                  <li>
                    <strong>Consent</strong>: Continued use of the website after changes constitutes acceptance of the revised Terms. For material changes affecting your rights, we may seek explicit consent where required by law.
                  </li>
                  <li>
                    <strong>Archival Access</strong>: Previous versions of these Terms are archived and available upon request for transparency and legal compliance.
                  </li>
                </ul>
                <p>
                  We encourage you to review these Terms regularly. If you object to changes, you may cease using the website or contact us to discuss concerns or data deletion options (see Privacy Policy).
                </p>
              </div>
            </section>
          )}

          <div className="policy-content__contact" data-aos="fade-up" data-aos-delay="450">
            <h3>Contact Information</h3>
            <p>For questions, concerns, or disputes related to these Terms, please contact us at:</p>
            <p>
              <strong>Email</strong>: <a href="mailto:makiayengue@gmail.com">makiayengue@gmail.com</a>
            </p>
            <p>
              <strong>Phone</strong>: (+237) 651-497-070
            </p>
            <p>
              <strong>LinkedIn</strong>: <a href="https://linkedin.com/in/makia-yengue-godwill-lavie-7aba12258" target="_blank" rel="noreferrer">linkedin.com/in/makia-yengue-godwill-lavie-7aba12258</a>
            </p>
            <p>
              <strong>Physical Address</strong>: MYG Tech, Buea, Southwest Region, Cameroon
            </p>
            <p>
              We aim to respond to inquiries within 24 hours and resolve issues within 7 business days. For legal matters, we will provide written documentation and cooperate fully with any regulatory or judicial processes.
            </p>
          </div>
        </div>

        </div>
        </div>


    </>
  );
};

export default TermsOfService;