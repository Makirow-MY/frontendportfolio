import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import React from 'react';

const ContactPage = () => {
  // Form state management
  const [formData, setFormData] = useState({
    clientInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      country: '',
      referralSource: '',
      contactMethod: ''
    },
    engagementType: '', // 'project', 'employment', or 'both'
    serviceSelection: {
      serviceType: '', // 'website', 'app', 'design', 'database', 'telecom'
      websiteDetails: {
        type: '', // 'basic', 'business', 'ecommerce', 'custom', 'other'
        customDescription: '',
        features: [],
        pages: 1
      },
      appDetails: {
        type: '', // 'mobile', 'cross-platform', 'desktop', 'pwa', 'other'
        customDescription: '',
        features: [],
        platforms: []
      },
      designDetails: {
        type: '', // 'website', 'mobile', 'brand', 'ux', 'other'
        customDescription: '',
        deliverables: []
      },
      databaseDetails: {
        type: '', // 'design', 'optimization', 'migration', 'management', 'other'
        customDescription: '',
        dbType: '',
        size: ''
      },
      telecomDetails: {
        type: '', // 'network', 'system', 'security', 'other'
        customDescription: '',
        needs: []
      }
    },
    employmentDetails: {
      roleType: '', // 'full-time', 'part-time', 'contract', 'internship'
      jobTitle: '',
      industry: '',
      salaryExpectation: '',
      jobDescription: '',
      startDate: '',
      duration: '',
      workLocation: '' // 'remote', 'onsite', 'hybrid'
    },
    projectInfo: {
      startDate: '',
      deadline: '',
      budgetRange: '',
      notes: '',
      urgency: '', // 'low', 'medium', 'high'
      attachments: []
    }
  });

  const [estimatedCost, setEstimatedCost] = useState(0);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Handle mouse movement for glow effect
  const handleMouseMove = (e) => {
    setGlowPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  // Handle form field changes
  const handleChange = (e, parent, child = null) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      
      if (type === 'checkbox') {
        if (child) {
          const currentArray = [...newData[parent][child][name]];
          if (checked) {
            currentArray.push(value);
          } else {
            const index = currentArray.indexOf(value);
            if (index > -1) currentArray.splice(index, 1);
          }
          newData[parent][child][name] = currentArray;
        } else {
          const currentArray = [...newData[parent][name]];
          if (checked) {
            currentArray.push(value);
          } else {
            const index = currentArray.indexOf(value);
            if (index > -1) currentArray.splice(index, 1);
          }
          newData[parent][name] = currentArray;
        }
      } else if (type === 'number') {
        if (child) {
          newData[parent][child] = {
            ...newData[parent][child],
            [name]: parseInt(value) || 0
          };
        } else {
          newData[parent] = {
            ...newData[parent],
            [name]: parseInt(value) || 0
          };
        }
      } else {
        if (child) {
          newData[parent][child] = {
            ...newData[parent][child],
            [name]: value
          };
        } else {
          newData[parent] = {
            ...newData[parent],
            [name]: value
          };
        }
      }
      
      return newData;
    });
  };

  // Handle file uploads
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      projectInfo: {
        ...prev.projectInfo,
        attachments: [...prev.projectInfo.attachments, ...files]
      }
    }));
  };

  // Remove uploaded file
  const removeFile = (index) => {
    setFormData(prev => {
      const newAttachments = [...prev.projectInfo.attachments];
      newAttachments.splice(index, 1);
      return {
        ...prev,
        projectInfo: {
          ...prev.projectInfo,
          attachments: newAttachments
        }
      };
    });
  };

  // Country options with phone validation
  const countryOptions = [
    { value: '', label: 'Select Country', phoneCode: '', phoneLength: 0 },
    { value: 'US', label: 'United States', phoneCode: '+1', phoneLength: 10 },
    { value: 'GB', label: 'United Kingdom', phoneCode: '+44', phoneLength: 10 },
    { value: 'CA', label: 'Canada', phoneCode: '+1', phoneLength: 10 },
    { value: 'AU', label: 'Australia', phoneCode: '+61', phoneLength: 9 },
    { value: 'DE', label: 'Germany', phoneCode: '+49', phoneLength: 10 },
    { value: 'FR', label: 'France', phoneCode: '+33', phoneLength: 9 },
    { value: 'NG', label: 'Nigeria', phoneCode: '+234', phoneLength: 10 },
    // Add more countries as needed
  ];

  // Extract country code from phone number
  const extractCountryCode = (phoneNumber) => {
    if (!phoneNumber) return null;
    
    const matchedCountries = countryOptions
      .filter(option => option.phoneCode && phoneNumber.startsWith(option.phoneCode))
      .sort((a, b) => b.phoneCode.length - a.phoneCode.length);
    
    return matchedCountries.length > 0 ? matchedCountries[0] : null;
  };

  // Validate phone number format
  const validatePhoneNumber = (phoneNumber, country) => {
    if (!phoneNumber || !country) return false;
    
    const numberWithoutCode = phoneNumber.replace(country.phoneCode, '').replace(/\D/g, '');
    
    if (numberWithoutCode.length !== country.phoneLength) {
      return false;
    }
    
    return /^\d+$/.test(numberWithoutCode);
  };

  // Handle phone number input with validation
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    let newValue = value;
    
    if (!value) {
      setFormData(prev => ({
        ...prev,
        clientInfo: {
          ...prev.clientInfo,
          phone: '',
          country: ''
        }
      }));
      setErrors(prev => ({
        ...prev,
        phone: '',
        country: ''
      }));
      return;
    }
    
    if (!value.startsWith('+')) {
      newValue = '+' + value.replace(/[^0-9]/g, '');
    } else {
      newValue = '+' + value.slice(1).replace(/[^0-9]/g, '');
    }
    
    const country = extractCountryCode(newValue);
    
    if (country) {
      const maxLength = country.phoneCode.length + country.phoneLength;
      if (newValue.length > maxLength) {
        newValue = newValue.substring(0, maxLength);
      }
      
      const isValid = validatePhoneNumber(newValue, country);
      
      setFormData(prev => ({
        ...prev,
        clientInfo: {
          ...prev.clientInfo,
          phone: newValue,
          country: country.value
        }
      }));
      
      setErrors(prev => ({
        ...prev,
        phone: isValid ? '' : `Please enter a valid ${country.label} phone number (${country.phoneLength} digits)`,
        country: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        clientInfo: {
          ...prev.clientInfo,
          phone: newValue,
          country: ''
        }
      }));
      
      setErrors(prev => ({
        ...prev,
        phone: 'Please enter a valid country code or select a country first',
        country: 'Please select a valid country from the list'
      }));
    }
  };

  // Handle country selection
  const handleCountryChange = (e) => {
    const { value } = e.target;
    const selectedCountry = countryOptions.find(option => option.value === value);
    
    setFormData(prev => ({
      ...prev,
      clientInfo: {
        ...prev.clientInfo,
        country: value,
        phone: selectedCountry?.phoneCode || ''
      }
    }));
    
    setErrors(prev => ({
      ...prev,
      country: '',
      phone: value ? '' : 'Please select your country'
    }));
  };

  // Calculate estimated cost based on selections
  useEffect(() => {
    let cost = 0;
    const { serviceType } = formData.serviceSelection;

    if (serviceType === 'website') {
      const { type, features, pages } = formData.serviceSelection.websiteDetails;
      
      // Base price based on website type
      switch (type) {
        case 'basic': cost = 500; break;
        case 'business': cost = 1500; break;
        case 'ecommerce': cost = 3500; break;
        case 'custom': cost = 5000; break;
        case 'other': cost = 0; break;
        default: cost = 0;
      }
      
      // Additional features
      features.forEach(feature => {
        switch (feature) {
          case 'seo': cost += 200; break;
          case 'hosting': cost += 100; break;
          case 'cms': cost += 300; break;
          case 'multilingual': cost += 250; break;
          case 'animations': cost += 400; break;
        }
      });
      
      // Page multiplier (after first 5 pages)
      if (pages > 5) {
        cost += (pages - 5) * 50;
      }
    } 
    else if (serviceType === 'app') {
      const { type, features, platforms } = formData.serviceSelection.appDetails;
      
      // Base price based on app type
      switch (type) {
        case 'mobile': cost = 10000; break;
        case 'cross-platform': cost = 8000; break;
        case 'desktop': cost = 5000; break;
        case 'pwa': cost = 4000; break;
        case 'other': cost = 0; break;
        default: cost = 0;
      }
      
      // Additional features
      features.forEach(feature => {
        switch (feature) {
          case 'auth': cost += 500; break;
          case 'notifications': cost += 300; break;
          case 'dashboard': cost += 600; break;
          case 'payments': cost += 1000; break;
          case 'api': cost += 700; break;
        }
      });
      
      // Platform multiplier
      if (platforms.includes('ios') && platforms.includes('android')) {
        cost *= 1.5;
      }
    }
    else if (serviceType === 'design') {
      const { type, deliverables } = formData.serviceSelection.designDetails;
      
      // Base price based on design type
      switch (type) {
        case 'website': cost = 1000; break;
        case 'mobile': cost = 1500; break;
        case 'brand': cost = 2000; break;
        case 'ux': cost = 3000; break;
        case 'other': cost = 0; break;
        default: cost = 0;
      }
      
      // Additional deliverables
      deliverables.forEach(item => {
        switch (item) {
          case 'logo': cost += 200; break;
          case 'styleguide': cost += 400; break;
          case 'prototype': cost += 600; break;
          case 'assets': cost += 300; break;
        }
      });
    }
    else if (serviceType === 'database') {
      const { type, size } = formData.serviceSelection.databaseDetails;
      
      // Base price based on database service
      switch (type) {
        case 'design': cost = 2000; break;
        case 'optimization': cost = 1500; break;
        case 'migration': cost = 3000; break;
        case 'management': cost = 500; break; // monthly
        case 'other': cost = 0; break;
        default: cost = 0;
      }
      
      // Size multiplier
      if (size === 'large') cost *= 1.5;
      if (size === 'enterprise') cost *= 2;
    }
    else if (serviceType === 'telecom') {
      const { type, needs } = formData.serviceSelection.telecomDetails;
      
      // Base price based on telecom service
      switch (type) {
        case 'network': cost = 5000; break;
        case 'system': cost = 7000; break;
        case 'security': cost = 6000; break;
        case 'other': cost = 0; break;
        default: cost = 0;
      }
      
      // Additional needs
      needs.forEach(need => {
        switch (need) {
          case 'consulting': cost += 1000; break;
          case 'implementation': cost += 2000; break;
          case 'maintenance': cost += 500; break; // monthly
        }
      });
    }

    setEstimatedCost(cost);
  }, [
    formData.serviceSelection,
    formData.serviceSelection.websiteDetails,
    formData.serviceSelection.appDetails,
    formData.serviceSelection.designDetails,
    formData.serviceSelection.databaseDetails,
    formData.serviceSelection.telecomDetails
  ]);

  // Validate current step before proceeding
  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.engagementType) {
        newErrors.engagementType = 'Please select an engagement type';
      }
    }

    if (currentStep === 2) {
      if (!formData.clientInfo.firstName) newErrors.firstName = 'First name is required';
      if (!formData.clientInfo.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.clientInfo.email) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.clientInfo.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.clientInfo.phone) newErrors.phone = 'Phone number is required';
      if (!formData.clientInfo.company) newErrors.company = 'Company name is required';
      if (!formData.clientInfo.country) newErrors.country = 'Country is required';
      if (!formData.clientInfo.contactMethod) newErrors.contactMethod = 'Preferred contact method is required';
    }

    if (currentStep === 3) {
      if (!formData.serviceSelection.serviceType) {
        newErrors.serviceType = 'Please select a service type';
      } else {
        // Validate based on service type
        if (formData.serviceSelection.serviceType === 'website') {
          if (!formData.serviceSelection.websiteDetails.type) {
            newErrors.websiteType = 'Please select a website type';
          }
        } else if (formData.serviceSelection.serviceType === 'app') {
          if (!formData.serviceSelection.appDetails.type) {
            newErrors.appType = 'Please select an app type';
          }
        } else if (formData.serviceSelection.serviceType === 'design') {
          if (!formData.serviceSelection.designDetails.type) {
            newErrors.designType = 'Please select a design service';
          }
        } else if (formData.serviceSelection.serviceType === 'database') {
          if (!formData.serviceSelection.databaseDetails.type) {
            newErrors.databaseType = 'Please select a database service';
          }
        } else if (formData.serviceSelection.serviceType === 'telecom') {
          if (!formData.serviceSelection.telecomDetails.type) {
            newErrors.telecomType = 'Please select a telecom service';
          }
        }
      }
    }

    if (currentStep === 4) {
      if (formData.engagementType === 'employment' || formData.engagementType === 'both') {
        if (!formData.employmentDetails.roleType) newErrors.roleType = 'Please select a role type';
        if (!formData.employmentDetails.jobTitle) newErrors.jobTitle = 'Job title is required';
        if (!formData.employmentDetails.industry) newErrors.industry = 'Industry is required';
      }
      
      if (formData.engagementType === 'project' || formData.engagementType === 'both') {
        if (!formData.projectInfo.startDate) newErrors.startDate = 'Start date is required';
        if (!formData.projectInfo.budgetRange) newErrors.budgetRange = 'Budget range is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation between steps
  const nextStep = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateStep(step)) {
      try {
        // Here you would typically send the form data to your backend
        console.log('Form data submitted:', formData);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setSubmitSuccess(true);
      } catch (error) {
        console.error('Submission error:', error);
        setErrors({ submit: 'Failed to submit form. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      clientInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        referralSource: '',
        contactMethod: ''
      },
      engagementType: '',
      serviceSelection: {
        serviceType: '',
        websiteDetails: {
          type: '',
          customDescription: '',
          features: [],
          pages: 1
        },
        appDetails: {
          type: '',
          customDescription: '',
          features: [],
          platforms: []
        },
        designDetails: {
          type: '',
          customDescription: '',
          deliverables: []
        },
        databaseDetails: {
          type: '',
          customDescription: '',
          dbType: '',
          size: ''
        },
        telecomDetails: {
          type: '',
          customDescription: '',
          needs: []
        }
      },
      employmentDetails: {
        roleType: '',
        jobTitle: '',
        industry: '',
        salaryExpectation: '',
        jobDescription: '',
        startDate: '',
        duration: '',
        workLocation: ''
      },
      projectInfo: {
        startDate: '',
        deadline: '',
        budgetRange: '',
        notes: '',
        urgency: '',
        attachments: []
      }
    });
    setStep(1);
    setSubmitSuccess(false);
  };

  // Render the form based on current step
  return (
    <>
      <Head>
        <title>Hire Me | Full-Stack Developer & Telecom Engineer</title>
        <meta name="description" content="Hire me for your next web development, app creation, UI/UX design, database management, or telecom engineering project" />
      </Head>

      <motion.div
        className="ContactPageSec"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        onMouseMove={handleMouseMove}
      >
        {/* Animated background glow */}
        <div
          className="footer-glow"
          style={{
            left: `${glowPosition.x}px`,
            top: `${glowPosition.y}px`,
          }}
        ></div>

        <div className="ContactPageSec__container">
          {/* Left side - Contact info */}
          <motion.div
            className="ContactPageSec__infoSection"
            variants={itemVariants}
          >
            <h2 className="ContactPageSec__infoTitle">Let's Build Something Amazing</h2>
            <p className="ContactPageSec__infoSubtitle">
              Have a project in mind or want to discuss potential opportunities?
              I'd love to hear from you! Whether you need a website, mobile app,
              database solution, or telecom expertise, let's make it happen.
            </p>
             
            <div className="ContactPageSec__availability">
              <div className="ContactPageSec__availabilityDot"></div>
              <span>Available for contract work or full-time positions</span>
            </div>

            <div className="ContactPageSec__availability">
              <div className="ContactPageSec__availabilityDot"></div>
              <span>Specializing in complex, high-performance solutions</span>
            </div>
            
            <div className="ContactPageSec__infoItems">
              <a className="ContactPageSec__infoItem" href='tel:+1234567890' target='_blank' rel="noreferrer">
                <div className="ContactPageSec__infoIcon">
                  <FaPhone />
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (234) 567-890</p>
                </div>
              </a>

              <a className="ContactPageSec__infoItem" href='mailto:contact@example.com' target='_blank' rel="noreferrer">
                <div className="ContactPageSec__infoIcon">
                  <FaEnvelope />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>contact@example.com</p>
                </div>
              </a>

              <a className="ContactPageSec__infoItem" href='https://linkedin.com' target='_blank' rel="noreferrer">
                <div className="ContactPageSec__infoIcon">
                  <FaLinkedin />
                </div>
                <div>
                  <h4>LinkedIn</h4>
                  <p>linkedin.com/in/yourprofile</p>
                </div>
              </a>

              <a className="ContactPageSec__infoItem" href='https://github.com' target='_blank' rel="noreferrer">
                <div className="ContactPageSec__infoIcon">
                  <FaGithub />
                </div>
                <div>
                  <h4>GitHub</h4>
                  <p>github.com/yourusername</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            className="ContactPageSec__formSection"
            variants={itemVariants}
          >
            {submitSuccess ? (
              <motion.div
                className="ContactPageSec__successMessage"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg className="ContactPageSec__successIcon" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <h3>Submission Successful!</h3>
                <p>Thank you for your interest. I'll review your request and get back to you within 24 hours.</p>
                <button onClick={resetForm} className="btn-primary">
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <>
                <h2 className="ContactPageSec__formTitle">Hire Me</h2>
                
                {/* Progress indicator */}
                <div className="progress-steps">
                  {[1, 2, 3, 4, 5].map((stepNumber) => (
                    <React.Fragment key={stepNumber}>
                      <div className={`step ${step >= stepNumber ? 'active' : ''}`}>
                        {stepNumber}
                      </div>
                      {stepNumber < 5 && (
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: step > stepNumber ? '100%' : '0%' }}
                          ></div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="leaveareplyform w-100">
                  {/* Step 1: Engagement Type */}
                  {step === 1 && (
                    <div className="form-step">
                      <h3>What type of engagement are you interested in?</h3>
                      
                      <div className="engagement-options">
                        <label className="engagement-option">
                          <input
                            type="radio"
                            name="engagementType"
                            value="project"
                            checked={formData.engagementType === 'project'}
                            onChange={(e) => handleChange(e, 'engagementType')}
                          />
                          <div className="option-card">
                            <h4>Project Work</h4>
                            <p>Hire me for a specific project (website, app, design, etc.)</p>
                            <ul>
                              <li>Fixed-price or hourly rates</li>
                              <li>Clear deliverables and timeline</li>
                              <li>Ongoing support available</li>
                            </ul>
                          </div>
                        </label>
                        
                        <label className="engagement-option">
                          <input
                            type="radio"
                            name="engagementType"
                            value="employment"
                            checked={formData.engagementType === 'employment'}
                            onChange={(e) => handleChange(e, 'engagementType')}
                          />
                          <div className="option-card">
                            <h4>Employment/Contract</h4>
                            <p>Hire me for a full-time, part-time, or contract position</p>
                            <ul>
                              <li>Long-term collaboration</li>
                              <li>Dedicated resources</li>
                              <li>Team integration</li>
                            </ul>
                          </div>
                        </label>
                        
                        <label className="engagement-option">
                          <input
                            type="radio"
                            name="engagementType"
                            value="both"
                            checked={formData.engagementType === 'both'}
                            onChange={(e) => handleChange(e, 'engagementType')}
                          />
                          <div className="option-card">
                            <h4>Both</h4>
                            <p>Start with a project and transition to ongoing work</p>
                            <ul>
                              <li>Project-to-hire model</li>
                              <li>Flexible arrangements</li>
                              <li>Get to know my work first</li>
                            </ul>
                          </div>
                        </label>
                      </div>
                      
                      {errors.engagementType && (
                        <div className="error-message">{errors.engagementType}</div>
                      )}
                      
                      <div className="form-actions">
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!formData.engagementType}
                          className="btn-primary"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Client Information */}
                  {step === 2 && (
                    <div className="form-step">
                      <h3>Your Contact Information</h3>
                      
                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="firstName">First Name*</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.clientInfo.firstName}
                            onChange={(e) => handleChange(e, 'clientInfo')}
                            className={errors.firstName ? 'error' : ''}
                          />
                          {errors.firstName && (
                            <div className="error-message">{errors.firstName}</div>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="lastName">Last Name*</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.clientInfo.lastName}
                            onChange={(e) => handleChange(e, 'clientInfo')}
                            className={errors.lastName ? 'error' : ''}
                          />
                          {errors.lastName && (
                            <div className="error-message">{errors.lastName}</div>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="email">Email*</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.clientInfo.email}
                            onChange={(e) => handleChange(e, 'clientInfo')}
                            className={errors.email ? 'error' : ''}
                          />
                          {errors.email && (
                            <div className="error-message">{errors.email}</div>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="company">Company/Organization*</label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.clientInfo.company}
                            onChange={(e) => handleChange(e, 'clientInfo')}
                            className={errors.company ? 'error' : ''}
                          />
                          {errors.company && (
                            <div className="error-message">{errors.company}</div>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="phone">Phone Number*</label>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.clientInfo.phone}
                            onChange={handlePhoneChange}
                            className={errors.phone ? 'error' : ''}
                            placeholder="+1234567890"
                          />
                          {errors.phone && (
                            <div className="error-message">{errors.phone}</div>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="country">Country*</label>
                          <select
                            id="country"
                            name="country"
                            value={formData.clientInfo.country}
                            onChange={handleCountryChange}
                            className={errors.country ? 'error' : ''}
                          >
                            {countryOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {errors.country && (
                            <div className="error-message">{errors.country}</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label>How did you hear about me?</label>
                        <select
                          name="referralSource"
                          value={formData.clientInfo.referralSource}
                          onChange={(e) => handleChange(e, 'clientInfo')}
                        >
                          <option value="">Select an option</option>
                          <option value="portfolio">My Portfolio</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="github">GitHub</option>
                          <option value="referral">Referral</option>
                          <option value="search">Search Engine</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Preferred Contact Method*</label>
                        <div className="radio-group">
                          {['Email', 'Phone', 'WhatsApp', 'Telegram'].map(method => (
                            <label key={method} className="radio-option">
                              <input
                                type="radio"
                                name="contactMethod"
                                value={method}
                                checked={formData.clientInfo.contactMethod === method}
                                onChange={(e) => handleChange(e, 'clientInfo')}
                              />
                              <span>{method}</span>
                            </label>
                          ))}
                        </div>
                        {errors.contactMethod && (
                          <div className="error-message">{errors.contactMethod}</div>
                        )}
                      </div>
                      
                      <div className="form-actions">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="btn-secondary"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="btn-primary"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Service Selection */}
                  {step === 3 && (
                    <div className="form-step">
                      <h3>Service Details</h3>
                      
                      <div className="form-group">
                        <label>What service do you need?*</label>
                        <select
                          name="serviceType"
                          value={formData.serviceSelection.serviceType}
                          onChange={(e) => handleChange(e, 'serviceSelection')}
                          className={errors.serviceType ? 'error' : ''}
                        >
                          <option value="">Select a service</option>
                          {formData.engagementType !== 'employment' && (
                            <>
                              <option value="website">Website Development</option>
                              <option value="app">App Development</option>
                              <option value="design">UI/UX Design</option>
                              <option value="database">Database Management</option>
                              <option value="telecom">Telecom Engineering</option>
                            </>
                          )}
                          {formData.engagementType !== 'project' && (
                            <option value="employment">Employment/Contract</option>
                          )}
                        </select>
                        {errors.serviceType && (
                          <div className="error-message">{errors.serviceType}</div>
                        )}
                      </div>
                      
                      {/* Website Development Options */}
                      {formData.serviceSelection.serviceType === 'website' && (
                        <div className="service-options">
                          <div className="form-group">
                            <label>Website Type*</label>
                            <select
                              name="type"
                              value={formData.serviceSelection.websiteDetails.type}
                              onChange={(e) => handleChange(e, 'serviceSelection', 'websiteDetails')}
                              className={errors.websiteType ? 'error' : ''}
                            >
                              <option value="">Select website type</option>
                              <option value="basic">Basic Informational Website ($500-$1,500)</option>
                              <option value="business">Business Website with CMS ($1,500-$3,500)</option>
                              <option value="ecommerce">E-commerce Website ($3,500-$7,500)</option>
                              <option value="custom">Custom Web Application ($5,000-$15,000+)</option>
                              <option value="other">Other (Custom Quote)</option>
                            </select>
                            {errors.websiteType && (
                              <div className="error-message">{errors.websiteType}</div>
                            )}
                          </div>
                          
                          {formData.serviceSelection.websiteDetails.type === 'other' && (
                            <div className="form-group">
                              <label>Describe Your Website Needs</label>
                              <textarea
                                name="customDescription"
                                value={formData.serviceSelection.websiteDetails.customDescription}
                                onChange={(e) => handleChange(e, 'serviceSelection', 'websiteDetails')}
                                placeholder="Please describe the type of website you need, including any specific features or functionalities..."
                              />
                            </div>
                          )}
                          
                          <div className="form-group">
                            <label>Estimated Number of Pages</label>
                            <input
                              type="number"
                              name="pages"
                              min="1"
                              onChange={(e) => handleChange(e, 'serviceSelection', 'websiteDetails')}
                              value={formData.serviceSelection.websiteDetails.pages}
                              />
                              </div>
                              </div>
                      )}
                      </div>
                  )
                  }
                </form>

                </>
            )
          }
          </motion.div>
          </div>
          </motion.div>
     </>
  );
}
export default ContactPage;