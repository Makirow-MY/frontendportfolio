import React, { useState } from 'react';


const ServicesPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  // Composed service data with persuasive copy
  const services = [
    {
      icon: '🚀',
      title: 'Elite Web Development',
      description: 'Transform your digital presence with our premium web development services. We craft blazing-fast, SEO-optimized websites that convert visitors into customers.',
      highlights: [
        'Custom-built with React/Next.js',
        '95+ PageSpeed Insights score',
        'E-commerce integration',
        '24/7 performance monitoring'
      ]
    },
    {
      icon: '📱',
      title: 'Flawless Mobile Experiences',
      description: 'Native-quality mobile apps that delight users and drive engagement. Built with React Native for cross-platform excellence.',
      highlights: [
        'iOS & Android deployment',
        'Offline-first architecture',
        'Biometric authentication',
        'App Store optimization'
      ]
    },
    {
      icon: '🎨',
      title: 'Pixel-Perfect UI/UX Design',
      description: 'Breathtaking interfaces that combine aesthetic brilliance with intuitive functionality. Our designs don\'t just look good - they work beautifully.',
      highlights: [
        'User journey mapping',
        'Interactive prototypes',
        'Design system creation',
        'Accessibility compliance'
      ]
    },
    {
      icon: '🔐',
      title: 'Enterprise-Grade Security',
      description: 'Protect your digital assets with our military-grade security solutions. Sleep soundly knowing your systems are impenetrable.',
      highlights: [
        'Penetration testing',
        'OWASP compliance',
        'Zero-trust architecture',
        'Real-time threat monitoring'
      ]
    }
  ];

  // Pricing tiers with compelling value propositions
  const pricingPlans = {
    basic: {
      name: 'Starter',
      price: '$2,999',
      period: 'project',
      features: [
        'Single-page application',
        'Responsive design',
        'Basic SEO setup',
        '1-month support'
      ],
      cta: 'Launch My Project',
      featured: false
    },
    pro: {
      name: 'Professional',
      price: '$9,999',
      period: 'project',
      features: [
        'Multi-page application',
        'CMS integration',
        'Advanced analytics',
        '3-month support',
        'Performance optimization'
      ],
      cta: 'Scale My Business',
      featured: true
    },
    enterprise: {
      name: 'Enterprise',
      price: 'Custom',
      period: 'solution',
      features: [
        'Custom web application',
        'API development',
        'Dedicated team',
        'Ongoing maintenance',
        'Priority support'
      ],
      cta: 'Get Bespoke Quote',
      featured: true
    }
  };

  return (
    <div className="sp">
      {/* Hero Section */}
      <section className="sp__hero">
        <div className="sp__hero-content">
          <h1 className="sp__hero-title">
            <span className="sp__hero-title-line">Crafting Digital</span>
            <span className="sp__hero-title-line sp__hero-title-line--highlight">Masterpieces</span>
          </h1>
          <p className="sp__hero-subtitle">
            Premium development services for visionary businesses. We transform ideas into 
            high-performance digital experiences that drive results.
          </p>
          <button className="sp__hero-cta">
            Explore Our Craft
            <span className="sp__hero-cta-icon">→</span>
          </button>
        </div>
        <div className="sp__hero-scroll-hint">
          <span>Discover Excellence</span>
          <div className="sp__hero-scroll-arrow"></div>
        </div>
        <div className="sp__hero-gradient"></div>
      </section>

      {/* Services Section */}
      <section className="sp__services">
        <div className="sp__section-header">
          <h2 className="sp__section-title">
            <span className="sp__section-title-pre">Our</span>
            Signature Services
          </h2>
          <p className="sp__section-intro">
            Each offering is meticulously crafted to deliver exceptional value and 
            tangible business outcomes.
          </p>
        </div>

        <div className="sp__services-grid">
          {services.map((service, index) => (
            <div className="sp__service-card" key={index}>
              <div className="sp__service-icon">{service.icon}</div>
              <h3 className="sp__service-title">{service.title}</h3>
              <p className="sp__service-description">{service.description}</p>
              <ul className="sp__service-highlights">
                {service.highlights.map((highlight, i) => (
                  <li className="sp__service-highlight" key={i}>
                    <span className="sp__service-highlight-icon">✓</span>
                    {highlight}
                  </li>
                ))}
              </ul>
              <button className="sp__service-cta">
                Explore {service.title}
                <span className="sp__service-cta-arrow">→</span>
              </button>
              <div className="sp__service-card-bg"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="sp__testimonials">
        <div className="sp__section-header">
          <h2 className="sp__section-title">
           Client Acclaim
          </h2>
          <p className="sp__section-intro">
            Don't take our word for it - hear from industry leaders who've experienced 
            our transformative work.
          </p>
        </div>

        <div className="sp__testimonials-container">
          {/* This would be populated from backend */}
          <div className="sp__testimonial-placeholder">
            <p>Client testimonials will be dynamically loaded here</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="sp__pricing">
        <div className="sp__section-header">
          <h2 className="sp__section-title">
            <span className="sp__section-title-pre">Transparent</span>
            Investment
          </h2>
          <p className="sp__section-intro">
            Premium results deserve appropriate investment. Select the package that 
            aligns with your ambitions.
          </p>
        </div>

        <div className="sp__pricing-toggle">
          <button 
            className={`sp__pricing-toggle-option ${selectedPlan === 'basic' ? 'sp__pricing-toggle-option--active' : ''}`}
            onClick={() => setSelectedPlan('basic')}
          >
            Starter
          </button>
          <button 
            className={`sp__pricing-toggle-option ${selectedPlan === 'pro' ? 'sp__pricing-toggle-option--active' : ''}`}
            onClick={() => setSelectedPlan('pro')}
          >
            Professional
          </button>
          <button 
            className={`sp__pricing-toggle-option ${selectedPlan === 'enterprise' ? 'sp__pricing-toggle-option--active' : ''}`}
            onClick={() => setSelectedPlan('enterprise')}
          >
            Enterprise
          </button>
        </div>

        <div className="sp__pricing-cards">
          {Object.entries(pricingPlans).map(([key, plan]) => (
            <div 
              className={`sp__pricing-card ${plan.featured ? 'sp__pricing-card--featured' : ''} ${selectedPlan === key ? 'sp__pricing-card--active' : ''}`}
              key={key}
            >
              {plan.featured && <div className="sp__pricing-card-badge">Most Popular</div>}
              <h3 className="sp__pricing-card-title">{plan.name}</h3>
              <div className="sp__pricing-card-price">
                {plan.price}
                <span className="sp__pricing-card-period">/{plan.period}</span>
              </div>
              <ul className="sp__pricing-card-features">
                {plan.features.map((feature, index) => (
                  <li className="sp__pricing-card-feature" key={index}>
                    <span className="sp__pricing-card-feature-icon">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="sp__pricing-card-cta">
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="sp__final-cta">
        <h2 className="sp__final-cta-title">Ready to Elevate Your Digital Presence?</h2>
        <p className="sp__final-cta-subtitle">
          Let's discuss how we can transform your vision into an extraordinary reality.
        </p>
        <div className="sp__final-cta-buttons">
          <button className="sp__final-cta-button sp__final-cta-button--primary">
            Schedule Consultation
          </button>
          <button className="sp__final-cta-button sp__final-cta-button--secondary">
            View Portfolio
          </button>
        </div>
        <div className="sp__final-cta-gradient"></div>
      </section>
    </div>
  );
};

export default ServicesPage;