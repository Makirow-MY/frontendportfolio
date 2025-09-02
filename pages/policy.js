import Head from 'next/head';
import React, { useState } from 'react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  const scrollToSection = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMouseMove = (e) => {
    setGlowPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <>
       <Head>
            <title>MYG Tech - Privacy Policy</title>
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
        <h1>Privacy Policy</h1>
        <p className="policy-content__last-updated">
          Last Updated: {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="policy-content__container">
        <nav className="policy-content__sidebar" data-aos="fade-right" data-aos-delay="200">
          <ul>
            {[
              'introduction',
              'data-collection',
              'data-usage',
              'payment-data',
              'cookies',
              'data-sharing',
              'data-transfers',
              'rights',
              'security',
              'third-party-links',
              'children-privacy',
              'dispute-resolution',
              'liability',
              'changes',
            ].map((section, index) => (
              <li
                key={section}
                className={`policy-content__nav-item ${activeSection === section ? 'active' : ''}`}
                onClick={() => scrollToSection(section)}
                data-aos="fade-up"
                data-aos-delay={300 + index * 50}
              >
                {section
                  .split('-')
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(' ')}
              </li>
            ))}
          </ul>
        </nav>

        <div className="policy-content__main">
          {activeSection === 'introduction' && (
            <section id="introduction" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>1. Introduction</h2>
              <div className="policy-content__section-content">
                <p>
                  Welcome to <strong>MYG Tech</strong>, operated by Makia Yengue Godwill, a professional Computer Engineer specializing in web development, mobile development, UI/UX design, network administration, and video editing. This Privacy Policy governs the collection, use, storage, and protection of personal and non-personal information when you interact with our portfolio website, including but not limited to contact forms, blog comments, project inquiries, and payment processing. Our commitment to privacy is unwavering, and we adhere to global data protection regulations, including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other applicable laws, to ensure a secure, transparent, and trustworthy experience.
                </p>
                <p>
                  This policy is designed to address every aspect of data handling, from collection to dispute resolution, with meticulous detail to eliminate ambiguity and provide clarity. By accessing or using our website, you consent to the practices outlined herein. We recommend reviewing this policy regularly, as it may be updated to reflect changes in our services or legal requirements. If you have any questions, our contact details are provided in the Contact Us section.
                </p>
                <p>
                  Our website is a professional platform showcasing services and projects. Any data provided, including payment-related information, is handled with the highest standards of security and confidentiality to protect your trust and ensure compliance with all relevant legal frameworks.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'data-collection' && (
            <section id="data-collection" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>2. Data Collection</h2>
              <div className="policy-content__section-content">
                <p>
                  We collect information to deliver personalized services, respond to inquiries, and enhance your experience on our portfolio website. Our data collection practices are transparent, purposeful, and limited to what is necessary for the functionality of our services. Below is a comprehensive list of the data we collect:
                </p>
                <ul>
                  <li>
                    <strong>Contact Information</strong>: Includes full name, email address, phone number, company name, country, and any additional details provided via our multi-step contact form, as defined in our Contact Schema. This data is collected when you submit inquiries for project work, employment opportunities, or general communication.
                  </li>
                  <li>
                    <strong>Engagement Details</strong>: Includes service preferences (e.g., Website Development, UI/UX Design), budget range, project specifications, and preferred contact methods (e.g., Email, WhatsApp, Telegram), captured during form submissions to tailor our responses to your needs.
                  </li>
                  <li>
                    <strong>Blog Interaction Data</strong>: Includes names, email addresses, and comments submitted through our blog comment system, stored in our Blog Schema. This data facilitates community engagement and is displayed publicly unless otherwise specified.
                  </li>
                  <li>
                    <strong>Payment Information</strong>: Includes billing details (e.g., name, billing address) and transaction data (e.g., payment method, amount) collected during project-related payments, processed through secure third-party payment gateways (see Payment Data Handling section).
                  </li>
                  <li>
                    <strong>Usage Data</strong>: Includes non-identifiable information such as IP addresses, browser type, device details, operating system, page views, time spent on pages, and navigation patterns, collected via analytics tools (e.g., Google Analytics) to optimize website performance.
                  </li>
                  <li>
                    <strong>Cookies and Tracking Technologies</strong>: Includes data from cookies, web beacons, and similar technologies to store user preferences, track interactions, and improve site functionality (see Cookies & Tracking section).
                  </li>
                </ul>
                <p>
                  Data collection occurs only when you voluntarily provide information (e.g., through forms or comments) or through automated means (e.g., cookies, analytics). You may opt not to provide certain data, but this may limit access to features such as submitting inquiries, leaving comments, or processing payments. We do not collect sensitive personal data (e.g., health, political opinions) unless explicitly provided by you for a specific purpose, and such data is handled with heightened security measures.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'data-usage' && (
            <section id="data-usage" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>3. Data Usage</h2>
              <div className="policy-content__section-content">
                <p>
                  We use collected data to provide high-quality services, enhance user experience, and maintain a secure platform. Our usage is strictly aligned with the purposes for which the data was collected, and we ensure compliance with all applicable laws. The specific uses of your data include:
                </p>
                <ul>
                  <li>
                    <strong>Service Delivery</strong>: To process and respond to project or employment inquiries, including communicating via your preferred method (e.g., Email, WhatsApp, Telegram) and delivering services such as website development or UI/UX design, as outlined in our Services Section.
                  </li>
                  <li>
                    <strong>Payment Processing</strong>: To facilitate secure transactions for project-related payments, including invoicing, payment confirmation, and refund processing, in partnership with trusted payment gateways (see Payment Data Handling section).
                  </li>
                  <li>
                    <strong>Blog Engagement</strong>: To manage and display user comments on blog posts, fostering industry discussions and sharing insights, with your name and comment publicly visible unless anonymized upon request.
                  </li>
                  <li>
                    <strong>Website Optimization</strong>: To analyze usage data for improving site performance, navigation, and content relevance, ensuring a seamless experience across devices.
                  </li>
                  <li>
                    <strong>Security and Fraud Prevention</strong>: To detect and prevent unauthorized access, fraudulent activities, or security threats, using tools like IP tracking and behavioral analysis.
                  </li>
                  <li>
                    <strong>Personalization</strong>: To tailor your experience using cookies, such as remembering language preferences, cookie consent choices, or project filter settings.
                  </li>
                  <li>
                    <strong>Legal Compliance</strong>: To comply with legal obligations, such as responding to regulatory requests or maintaining records for tax and audit purposes.
                  </li>
                </ul>
                <p>
                  We do not use your data for purposes beyond those listed, nor do we sell, rent, or trade your personal information to third parties for marketing purposes. Any data usage requiring your consent (e.g., non-essential cookies) is clearly communicated, and you may withdraw consent at any time (see Your Rights section).
                </p>
              </div>
            </section>
          )}

          {activeSection === 'payment-data' && (
            <section id="payment-data" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>4. Payment Data Handling</h2>
              <div className="policy-content__section-content">
                <p>
                  At MYG Tech, we facilitate payments for services such as website development, mobile apps, and UI/UX design through secure third-party payment processors (e.g., Stripe, PayPal). We are committed to protecting your payment data with industry-leading security measures and transparent practices. Below are the details of how we handle payment-related information:
                </p>
                <ul>
                  <li>
                    <strong>Data Collected</strong>: We collect billing details (e.g., name, billing address, email) and transaction information (e.g., payment amount, date, service purchased). Credit card numbers, bank account details, or other sensitive payment information are not stored on our servers but are processed directly by our payment processors.
                  </li>
                  <li>
                    <strong>Processing</strong>: Payments are processed through PCI-DSS-compliant payment gateways, ensuring secure transmission via SSL/TLS encryption (256-bit). We receive only confirmation of payment success or failure, along with a transaction ID, to verify and fulfill your order.
                  </li>
                  <li>
                    <strong>Storage</strong>: Billing details and transaction records are stored securely in our Contact Schema for invoicing, refund processing, and legal compliance (e.g., tax obligations). Data is encrypted at rest using AES-256 encryption and retained only for the duration required by law (typically 7 years for financial records).
                  </li>
                  <li>
                    <strong>Refunds</strong>: Refund requests are processed within 14 days of receipt, subject to our refund policy. You may request a refund by contacting us (see Contact Us section). Refunds are issued through the original payment method, and we retain no additional payment data post-refunded.
                  </li>
                  <li>
                    <strong>Security Measures</strong>: Payment data is protected by multi-layered security, including encryption, restricted access, and regular audits of our payment integration systems. We comply with PCI-DSS standards and conduct quarterly vulnerability scans to ensure robust protection.
                  </li>
                  <li>
                    <strong>Third-Party Processors</strong>: We partner with reputable payment providers bound by strict data protection agreements. These providers handle sensitive payment data and are responsible for their own compliance with PCI-DSS and data protection laws.
                  </li>
                </ul>
                <p>
                  We do not store or process sensitive payment details (e.g., credit card numbers) directly, minimizing the risk of data exposure. If a payment dispute arises, we will work transparently to resolve it, and you may contact us for assistance. For additional details, refer to our Terms of Service or contact us directly.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'cookies' && (
            <section id="cookies" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>5. Cookies & Tracking</h2>
              <div className="policy-content__section-content">
                <p>
                  Our website employs cookies and tracking technologies to enhance functionality, personalize your experience, and analyze performance. These technologies are integral to features like project filtering, blog comment pagination, and social sharing. Below is a detailed breakdown of our cookie practices:
                </p>
                <ul>
                  <li>
                    <strong>Types of Cookies</strong>:
                    <ul>
                      <li>
                        <strong>Essential Cookies</strong>: Required for core functionality, such as form submissions, navigation, and session management. These cannot be disabled without affecting website operability.
                      </li>
                      <li>
                        <strong>Analytics Cookies</strong>: Collect anonymized data (e.g., page views, click patterns) via tools like Google Analytics to optimize site performance and content relevance.
                      </li>
                      <li>
                        <strong>Preference Cookies</strong>: Store user settings (e.g., language, cookie consent choices) to provide a tailored experience.
                      </li>
                      <li>
                        <strong>Marketing Cookies</strong>: Used sparingly to track interactions with social sharing features (e.g., LinkedIn, Twitter buttons) to measure engagement (optional and disabled by default).
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Purpose</strong>: Cookies enable features like remembering your cookie preferences, tracking project filter selections, and analyzing traffic to improve load times and accessibility.
                  </li>
                  <li>
                    <strong>Management</strong>: You can accept or reject non-essential cookies via the controls below or through your browser settings. Disabling non-essential cookies may limit personalization features but will not affect core functionality.
                  </li>
                  <li>
                    <strong>Duration</strong>: Session cookies expire when you close your browser, while persistent cookies (e.g., for preferences) are stored for up to 12 months or until you clear them.
                  </li>
                  <li>
                    <strong>Third-Party Cookies</strong>: Analytics and social sharing tools may set third-party cookies, governed by their respective privacy policies (e.g., Google Analytics, LinkedIn). We ensure these partners comply with data protection laws.
                  </li>
                </ul>
                <p>
                  By clicking “Accept All,” you consent to all cookies. Selecting “Reject Non-Essential” disables analytics and marketing cookies while preserving essential functionality. You may modify your preferences at any time via your browser or by contacting us.
                </p>
                <div className="policy-content__cookie-controls">
                  <button className="policy-content__cookie-btn policy-content__cookie-btn--accept" data-aos="zoom-in" data-aos-delay="450">
                    Accept All
                  </button>
                  <button className="policy-content__cookie-btn policy-content__cookie-btn--reject" data-aos="zoom-in" data-aos-delay="500">
                    Reject Non-Essential
                  </button>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'data-sharing' && (
            <section id="data-sharing" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>6. Data Sharing</h2>
              <div className="policy-content__section-content">
                <p>
                  We prioritize the confidentiality of your personal information and share data only under strictly controlled circumstances. Our sharing practices are designed to support service delivery while adhering to data protection laws. We share data in the following scenarios:
                </p>
                <ul>
                  <li>
                    <strong>Service Providers</strong>: We engage trusted third-party providers (e.g., hosting services like AWS, analytics platforms like Google Analytics, payment processors like Stripe) to operate our website and deliver services. These providers are bound by data protection agreements, ensuring compliance with GDPR, CCPA, and other regulations.
                  </li>
                  <li>
                    <strong>Project Collaboration</strong>: With your explicit consent, we may share project-related data (e.g., specifications, budget) with collaborators or clients to facilitate project delivery, as outlined in our Services Section. Consent is obtained via our contact form or written agreement.
                  </li>
                  <li>
                    <strong>Legal Obligations</strong>: We may disclose data to comply with legal requirements, such as responding to court orders, subpoenas, or regulatory audits, or to protect our legal rights, property, or safety of users.
                  </li>
                  <li>
                    <strong>Business Transfers</strong>: In the event of a merger, acquisition, or sale of assets, user data may be transferred to a successor entity, with notification provided and your rights preserved under applicable laws.
                  </li>
                </ul>
                <p>
                  All third parties receiving data are contractually obligated to protect it, use it only for the specified purpose, and comply with data protection laws. We do not share data for marketing purposes unless explicitly authorized by you. If you have concerns about data sharing, please contact us (see Contact Us section).
                </p>
              </div>
            </section>
          )}

          {activeSection === 'data-transfers' && (
            <section id="data-transfers" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>7. International Data Transfers</h2>
              <div className="policy-content__section-content">
                <p>
                  As a global service provider, MYG Tech may transfer personal data across international borders to deliver services or comply with operational needs. We ensure that such transfers comply with stringent data protection standards to safeguard your information:
                </p>
                <ul>
                  <li>
                    <strong>Transfer Scenarios</strong>: Data may be transferred to servers or service providers located outside your country (e.g., AWS servers in the US, EU, or other regions) for hosting, analytics, or payment processing.
                  </li>
                  <li>
                    <strong>Legal Safeguards</strong>: For transfers to countries without an adequacy decision under GDPR (e.g., non-EU countries), we use Standard Contractual Clauses (SCCs) approved by the European Commission, binding corporate rules, or other legally recognized mechanisms to ensure equivalent protection.
                  </li>
                  <li>
                    <strong>Security Measures</strong>: All transferred data is encrypted in transit (SSL/TLS 256-bit) and at rest (AES-256). We conduct Data Protection Impact Assessments (DPIAs) for high-risk transfers to mitigate potential risks.
                  </li>
                  <li>
                    <strong>User Notification</strong>: If your data is transferred internationally, you will be informed via our contact form or project agreements, and you may request details of the transfer mechanisms used.
                  </li>
                </ul>
                <p>
                  We continuously monitor international data protection laws to ensure compliance. If you are concerned about where your data is processed or stored, please contact us to discuss specific safeguards or request data localization options where feasible.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'rights' && (
            <section id="rights" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>8. Your Rights</h2>
              <div className="policy-content__section-content">
                <p>
                  As a user, you have extensive rights over your personal data under global data protection laws, including GDPR, CCPA, and PIPEDA. We are committed to facilitating the exercise of these rights promptly and transparently:
                </p>
                <ul>
                  <li>
                    <strong>Right to Access</strong>: Request a detailed report of all personal data we hold about you, including contact form submissions, blog comments, and payment records, provided in a structured, machine-readable format within 30 days.
                  </li>
                  <li>
                    <strong>Right to Rectification</strong>: Request corrections to inaccurate or incomplete data (e.g., outdated contact details or erroneous comments) to ensure accuracy.
                  </li>
                  <li>
                    <strong>Right to Erasure</strong>: Request deletion of your data (e.g., contact form submissions, blog comments) unless we are required to retain it for legal purposes (e.g., tax records). Deletion requests are processed within 30 days.
                  </li>
                  <li>
                    <strong>Right to Restrict Processing</strong>: Request that we limit the use of your data (e.g., for analytics or sharing) while we address your concerns or verify data accuracy.
                  </li>
                  <li>
                    <strong>Right to Object</strong>: Object to specific data processing activities, such as analytics or marketing cookies, with immediate effect unless overridden by legal obligations.
                  </li>
                  <li>
                    <strong>Right to Data Portability</strong>: Request a transferable copy of your data (e.g., contact or payment details) in a structured, commonly used format (e.g., JSON, CSV) for use with other services.
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent</strong>: Revoke consent for data processing (e.g., cookies, project-related data sharing) at any time, with no impact on prior lawful processing.
                  </li>
                  <li>
                    <strong>Right to Non-Discrimination</strong>: We will not deny services, charge different prices, or provide lower-quality services if you exercise your rights (e.g., rejecting non-essential cookies).
                  </li>
                  <li>
                    <strong>Right to Complain</strong>: Lodge a complaint with a supervisory authority (e.g., EU Data Protection Authorities, California Attorney General) if you believe your rights have been violated. We will cooperate fully with any investigation.
                  </li>
                </ul>
                <p>
                  To exercise these rights, contact us via the details in the Contact Us section. We will respond within 30 days (or 15 days under CCPA for certain requests) and may require identity verification to protect your data. No fees are charged for standard requests, but excessive or repetitive requests may incur reasonable administrative costs, as permitted by law.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'security' && (
            <section id="security" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>9. Data Security</h2>
              <div className="policy-content__section-content">
                <p>
                  Protecting your personal and payment data is a cornerstone of our operations at MYG Tech. We implement industry-leading, multi-layered security measures to safeguard your information against unauthorized access, loss, or breaches:
                </p>
                <ul>
                  <li>
                    <strong>Encryption</strong>: All data transmitted via our website (e.g., contact forms, blog comments, payment details) is secured with SSL/TLS 256-bit encryption. Data at rest (e.g., in our MongoDB database) is encrypted using AES-256.
                  </li>
                  <li>
                    <strong>Access Controls</strong>: Access to personal data is restricted to authorized personnel only, using role-based access controls (RBAC), multi-factor authentication (MFA), and secure API keys.
                  </li>
                  <li>
                    <strong>Regular Audits</strong>: We conduct quarterly security audits, including penetration testing and vulnerability scans, to identify and mitigate risks. External auditors verify compliance with ISO 27001 standards.
                  </li>
                  <li>
                    <strong>Incident Response</strong>: In the unlikely event of a data breach, we follow a documented incident response plan, including notifying affected users within 72 hours (per GDPR), investigating the breach, and implementing corrective measures.
                  </li>
                  <li>
                    <strong>Data Minimization</strong>: We collect only the data necessary for specific purposes, as defined in our Contact, Blog, and Payment Schemas, reducing exposure risks.
                  </li>
                  <li>
                    <strong>Secure Development</strong>: Our website, built with React and Next.js, adheres to OWASP Top 10 security guidelines, with protections against XSS, CSRF, and SQL injection attacks.
                  </li>
                  <li>
                    <strong>Third-Party Security</strong>: All third-party providers (e.g., AWS, Stripe) are vetted for compliance with SOC 2, PCI-DSS, and GDPR standards, with regular reviews of their security practices.
                  </li>
                </ul>
                <p>
                  Despite our robust measures, no system is entirely immune to risks. In the event of a security incident, we will promptly notify affected users, provide mitigation steps, and cooperate with authorities. For inquiries about our security practices, please contact us.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'third-party-links' && (
            <section id="third-party-links" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>10. Third-Party Links</h2>
              <div className="policy-content__section-content">
                <p>
                  Our website includes links to external platforms, such as social media profiles (e.g., LinkedIn, GitHub), project repositories, and payment gateways. These links enhance user engagement and service delivery but are governed by third-party privacy policies:
                </p>
                <ul>
                  <li>
                    <strong>Scope</strong>: External links include social sharing buttons (e.g., Twitter, LinkedIn), project demo links, and payment processor redirects (e.g., Stripe checkout pages).
                  </li>
                  <li>
                    <strong>Responsibility</strong>: We are not responsible for the content, security, or privacy practices of third-party sites. Users access these sites at their own risk and should review their respective privacy policies.
                  </li>
                  <li>
                    <strong>Safeguards</strong>: We verify that linked third parties adhere to reputable standards (e.g., GDPR compliance for EU users) and limit links to trusted platforms.
                  </li>
                </ul>
                <p>
                  If you encounter issues with third-party sites or wish to report a problematic link, please contact us. We recommend exercising caution when sharing personal information on external platforms.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'children-privacy' && (
            <section id="children-privacy" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>11. Children’s Privacy</h2>
              <div className="policy-content__section-content">
                <p>
                  Our website is designed for professional users and is not intended for individuals under 16 years of age. We comply with the Children’s Online Privacy Protection Act (COPPA) and equivalent regulations globally:
                </p>
                <ul>
                  <li>
                    <strong>No Collection</strong>: We do not knowingly collect personal information from children under 16. Features like contact forms and blog comments are intended for adult use.
                  </li>
                  <li>
                    <strong>Parental Requests</strong>: If we discover that a child’s data has been collected (e.g., via a contact form), we will delete it immediately and notify the parent or guardian if identifiable.
                  </li>
                  <li>
                    <strong>Verification</strong>: We may implement age verification mechanisms for certain features (e.g., blog comments) to prevent underage use.
                  </li>
                </ul>
                <p>
                  Parents or guardians who believe their child has provided personal information should contact us immediately (see Contact Us section). We will take swift action to remove the data and prevent further collection.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'dispute-resolution' && (
            <section id="dispute-resolution" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>12. Dispute Resolution</h2>
              <div className="policy-content__section-content">
                <p>
                  We are committed to resolving any disputes related to this Privacy Policy or our data practices amicably and transparently. Our dispute resolution process is designed to address concerns efficiently while protecting your rights:
                </p>
                <ul>
                  <li>
                    <strong>Initial Contact</strong>: Please contact us via the details in the Contact Us section to raise any concerns about data handling, payments, or privacy practices. We will respond within 24 hours and aim to resolve issues within 7 business days.
                  </li>
                  <li>
                    <strong>Mediation</strong>: If a resolution cannot be reached, we offer mediation through a neutral third-party mediator in Cameroon, conducted in accordance with local laws and GDPR principles for EU users.
                  </li>
                  <li>
                    <strong>Legal Recourse</strong>: If mediation fails, disputes will be governed by the laws of Cameroon and resolved in the courts of Buea, Cameroon, unless otherwise required by applicable data protection laws (e.g., GDPR for EU residents).
                  </li>
                  <li>
                    <strong>Supervisory Authorities</strong>: You may lodge a complaint with a data protection authority (e.g., EU DPA, California Attorney General) if you believe your rights have been violated. We will cooperate fully with any investigation.
                  </li>
                </ul>
                <p>
                  We encourage open communication to resolve disputes without escalation. All communications and resolutions will be documented, and you will receive written confirmation of outcomes. For payment disputes, refer to the Payment Data Handling section.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'liability' && (
            <section id="liability" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>13. Limitation of Liability</h2>
              <div className="policy-content__section-content">
                <p>
                  While we take every precaution to protect your data and provide a secure experience, certain limitations of liability apply to our data practices and website usage:
                </p>
                <ul>
                  <li>
                    <strong>Data Breaches</strong>: In the unlikely event of a data breach, our liability is limited to notifying affected users and taking reasonable mitigation steps, as outlined in the Data Security section. We are not liable for damages beyond our direct control (e.g., third-party breaches).
                  </li>
                  <li>
                    <strong>Third-Party Actions</strong>: We are not liable for the actions, privacy practices, or security failures of third-party sites or services linked from our website (e.g., payment processors, social media platforms).
                  </li>
                  <li>
                    <strong>Service Interruptions</strong>: We are not liable for interruptions to website access due to technical issues, maintenance, or force majeure events (e.g., natural disasters, cyberattacks beyond our control).
                  </li>
                  <li>
                    <strong>Indirect Damages</strong>: To the fullest extent permitted by law, MYG Tech, its owner, and affiliates are not liable for indirect, consequential, or punitive damages arising from your use of the website or data handling practices.
                  </li>
                </ul>
                <p>
                  These limitations do not affect your statutory rights under applicable data protection laws (e.g., GDPR, CCPA). If you have concerns about liability or seek clarification, please contact us to discuss specific scenarios or legal protections.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'changes' && (
            <section id="changes" className="policy-content__section" data-aos="fade-up" data-aos-delay="400">
              <h2>14. Policy Changes</h2>
              <div className="policy-content__section-content">
                <p>
                  We may update this Privacy Policy to reflect changes in our practices, legal requirements, or website functionality. Our update process is transparent and ensures users are informed of significant changes:
                </p>
                <ul>
                  <li>
                    <strong>Notification Methods</strong>: Updates will be communicated via prominent website banners, pop-ups, or email notifications to users who have provided contact details (e.g., via contact forms or blog comments).
                  </li>
                  <li>
                    <strong>Effective Date</strong>: The “Last Updated” date at the top of this policy will be revised to reflect the effective date of changes. Significant updates (e.g., new data uses) will be highlighted for 30 days.
                  </li>
                  <li>
                    <strong>User Consent</strong>: If changes materially affect your rights or data usage, we will seek your consent where required by law (e.g., GDPR for new processing purposes).
                  </li>
                  <li>
                    <strong>Archival Access</strong>: Previous versions of this policy are archived and available upon request for transparency and legal compliance.
                  </li>
                </ul>
                <p>
                  Continued use of our website after updates constitutes acceptance of the revised policy. We encourage regular review of this policy to stay informed. If you object to changes, you may exercise your rights (e.g., data deletion) or contact us to discuss concerns.
                </p>
              </div>
            </section>
          )}

          <div className="policy-content__contact" data-aos="fade-up" data-aos-delay="450">
            <h3>Contact Us</h3>
            <p>
              For questions, concerns, or requests related to this Privacy Policy, your personal data, payments, or security practices, please contact us at:
            </p>
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
              We are committed to addressing inquiries promptly, typically within 24 hours, and resolving issues within 7 business days. For data rights requests, we will respond within 30 days (or 15 days for CCPA requests), with identity verification as needed to protect your data. If you are dissatisfied, you may escalate concerns to a supervisory authority, and we will cooperate fully.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    </>
    
  );
};

export default PrivacyPolicy;