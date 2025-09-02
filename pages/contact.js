import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaTwitter, FaBriefcase, FaUserFriends, FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaHandshake } from 'react-icons/fa6';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '@/components/Spinner';
import { DotLoader } from 'react-spinners';

const ContactPage = () => {
 const [formData, setFormData] = useState({
         personal: {
           firstName: '',
           lastName: '',
           email: '',
           phone: '',
           company: '',
           country: '',           
         },
         project: {
           projectName: '',
           price: '',
           description: '',
           expiry: '',
           cvv: '',
           bankAccount: '',
           bankRouting: '',
           bankName: ''
         },
      serviceSelection: {
      serviceType: '',
      websiteDetails: {
            type: '',
            customDescription: '',
            defaultFeatures: [],  // Added for default features
            additionalFeatures: []  // Changed from just 'features'
        },
        appDetails: {
            type: '',
            customDescription: '',
            defaultFeatures: [],  // Added for default features
            additionalFeatures: []  // Changed from just 'features'
      },
      designDetails: {
        type: '',
        customDescription: ''
      },
      databaseDetails: {
        needs: []
      },
      telecomDetails: {
        needs: [],
        customDescription: ''
      },
      employmentDetails: {
        roleType: '',
        jobTitle: '',
        industry: '',
        salaryExpectation: '',
        jobDescription: ''
      }
    },

       });

       const [formData1, setFormData1] = useState({
    clientInfo: {
           firstName: '',
           lastName: '',
           email: '',
           phone: '',
           company: '',
           country: '',
      referralSource: '',
      referralSourceOther: '',
      contactMethod: ''
    },
    engagementType: 'project',
    serviceSelection: {
      serviceType: 'Website Development',
      websiteDetails: {
            type: '',
            customDescription: '',
            defaultPages: ['Home', 'About', 'Contact', 'PrivacyPolicy', 'TermsOfService',  '404'],  // Changed from defaultFeatures
            additionalPages: []  // Changed from additionalFeatures
        },
        appDetails: {
            type: '',
            customDescription: '',
            defaultScreens: ['Splash', 'Auth', 'Home', 'Profile', 'Settings', 'Error'],  // For apps we'll use "screens" instead of "pages"
            additionalScreens: [],
        },
      designDetails: {
        type: '',
        customDescription: ''
      },
      databaseDetails: {
        needs: []
      },
      telecomDetails: {
        needs: [],
        customDescription: ''
      },
      employmentDetails: {
        roleType: '',
        jobTitle: '',
        industry: '',
        salaryExpectation: '',
        jobDescription: ''
      }
    },
    projectInfo: {
      startDate: '',
      deadline: '',
      budgetRange: '',
      notes: '',
      urgency: ''
    }
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const [estimatedCost, setEstimatedCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

   const handleChange1 = (e, parent, child = null) => {
    const { name, value, type, checked } = e.target;
    
    setFormData1(prev => {
      const newData = { ...prev };
      
      if (type === 'checkbox') {
        if (child) {
          const currentFeatures = [...newData[parent][child][name]];
          if (checked) {
            currentFeatures.push(value);
          } else {
            const index = currentFeatures.indexOf(value);
            if (index > -1) currentFeatures.splice(index, 1);
          }
          newData[parent][child][name] = currentFeatures;
        } else {
          const currentNeeds = [...newData[parent][name]];
          if (checked) {
            currentNeeds.push(value);
          } else {
            const index = currentNeeds.indexOf(value);
            if (index > -1) currentNeeds.splice(index, 1);
          }
          newData[parent][name] = currentNeeds;
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

const [allform, setAllForm] = useState(false);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        

            setFormData1(prev => ({
                ...prev,
                [name]: value
            }));

            

    };

  const { serviceType, websiteDetails, appDetails, designDetails } = formData1.serviceSelection;
    // Calculate cost whenever relevant fields change
  useEffect(() => {
    let cost = 0;
  

    if (serviceType === 'website') {
      switch (websiteDetails.type) {
        case 'basic': cost = 500; break;
        case 'ecommerce': cost = 1500; break;
        case 'webapp': cost = 3000; break;
        case 'landing': cost = 300; break;
        default: cost = 0;
      }

      websiteDetails.features.forEach(feature => {
        switch (feature) {
          case 'seo': cost += 200; break;
          case 'hosting': cost += 100; break;
          case 'cms': cost += 300; break;
          case 'multilingual': cost += 250; break;
          case 'animations': cost += 400; break;
        }
      });
    } else if (serviceType === 'app') {
      switch (appDetails.type) {
        case 'Basic Mobile App (iOS/Android)': cost = 3000; break;
        case 'E-Commerce App': cost = 6000; break;
        case 'Social Media App': cost = 8000; break;
        case 'Enterprise App': cost = 10000; break;
        default: cost = 0;
      }

      appDetails.features.forEach(feature => {
        switch (feature) {
          case 'User Authentication': cost += 500; break;
          case 'Push Notifications': cost += 300; break;
          case 'Admin Dashboard': cost += 600; break;
          case 'Payment Gateway': cost += 1000; break;
          case 'API Integration': cost += 700; break;
        }
      });
    } else if (serviceType === 'design') {
      switch (designDetails.type) {
        case 'logo': cost = 200; break;
        case 'wireframes': cost = 400; break;
        case 'uikit': cost = 600; break;
        case 'redesign': cost = 1500; break;
        default: cost = 0;
      }
    }

    setEstimatedCost(cost);
    console.log(" const { serviceType, websiteDetails, appDetails, designDetails }", { serviceType, websiteDetails, appDetails, designDetails })
  }, [formData1.serviceSelection.websiteDetails, 
    formData1.serviceSelection.appDetails,
    formData1.serviceSelection.designDetails,
     formData1.serviceSelection.designDetails.type
  ]);

  
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
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
   const handleMouseMove = (e) => {
    setGlowPosition({
      x: e.clientX,
      y: e.clientY
    });
  };



  const nextStep = (e) => {
      e.preventDefault();
    if (validateStep(step)) {
      setStep(step + 1);
       const FullName = `${formData1.clientInfo.firstName} ${formData1.clientInfo.lastName}`
       setFormData1(prev => ({
          ...prev,
          clientInfo: {
             ...prev.clientInfo,
             profilePicture: `https://ui-avatars.com/api/?name=${FullName}&background=random`,
             referralSource: formData1.clientInfo.referralSourceOther !== '' ? formData1.clientInfo.referralSourceOther : formData1.clientInfo.referralSource
          }

         }))  
    }
  };

  const countryOptions = [
    { value: '', label: 'Select Country', phoneCode: '', phoneLength: 0 },
    { value: 'AE', label: 'United Arab Emirates', phoneCode: '+971', phoneLength: 9 },
    { value: 'AR', label: 'Argentina', phoneCode: '+54', phoneLength: 10 },
    { value: 'AT', label: 'Austria', phoneCode: '+43', phoneLength: 10 },
    { value: 'AU', label: 'Australia', phoneCode: '+61', phoneLength: 9 },
    { value: 'BE', label: 'Belgium', phoneCode: '+32', phoneLength: 9 },
    { value: 'BR', label: 'Brazil', phoneCode: '+55', phoneLength: 11 },
    { value: 'CA', label: 'Canada', phoneCode: '+1', phoneLength: 10 },
    { value: 'CH', label: 'Switzerland', phoneCode: '+41', phoneLength: 9 },
    { value: 'CL', label: 'Chile', phoneCode: '+56', phoneLength: 9 },
    { value: 'CM', label: 'Cameroon', phoneCode: '+237', phoneLength: 9 },
    { value: 'CN', label: 'China', phoneCode: '+86', phoneLength: 11 },
    { value: 'CO', label: 'Colombia', phoneCode: '+57', phoneLength: 10 },
    { value: 'CZ', label: 'Czech Republic', phoneCode: '+420', phoneLength: 9 },
    { value: 'DE', label: 'Germany', phoneCode: '+49', phoneLength: 10 },
    { value: 'DK', label: 'Denmark', phoneCode: '+45', phoneLength: 8 },
    { value: 'EG', label: 'Egypt', phoneCode: '+20', phoneLength: 10 },
    { value: 'ES', label: 'Spain', phoneCode: '+34', phoneLength: 9 },
    { value: 'FI', label: 'Finland', phoneCode: '+358', phoneLength: 9 },
    { value: 'FR', label: 'France', phoneCode: '+33', phoneLength: 9 },
    { value: 'GB', label: 'United Kingdom', phoneCode: '+44', phoneLength: 10 },
    { value: 'GH', label: 'Ghana', phoneCode: '+233', phoneLength: 9 },
    { value: 'GR', label: 'Greece', phoneCode: '+30', phoneLength: 10 },
    { value: 'HK', label: 'Hong Kong', phoneCode: '+852', phoneLength: 8 },
    { value: 'HU', label: 'Hungary', phoneCode: '+36', phoneLength: 9 },
    { value: 'ID', label: 'Indonesia', phoneCode: '+62', phoneLength: 10 },
    { value: 'IE', label: 'Ireland', phoneCode: '+353', phoneLength: 9 },
    { value: 'IL', label: 'Israel', phoneCode: '+972', phoneLength: 9 },
    { value: 'IN', label: 'India', phoneCode: '+91', phoneLength: 10 },
    { value: 'IT', label: 'Italy', phoneCode: '+39', phoneLength: 10 },
    { value: 'JP', label: 'Japan', phoneCode: '+81', phoneLength: 10 },
    { value: 'KE', label: 'Kenya', phoneCode: '+254', phoneLength: 9 },
    { value: 'KR', label: 'South Korea', phoneCode: '+82', phoneLength: 10 },
    { value: 'KW', label: 'Kuwait', phoneCode: '+965', phoneLength: 8 },
    { value: 'MX', label: 'Mexico', phoneCode: '+52', phoneLength: 10 },
    { value: 'MY', label: 'Malaysia', phoneCode: '+60', phoneLength: 9 },
    { value: 'NG', label: 'Nigeria', phoneCode: '+234', phoneLength: 10 },
    { value: 'NL', label: 'Netherlands', phoneCode: '+31', phoneLength: 9 },
    { value: 'NO', label: 'Norway', phoneCode: '+47', phoneLength: 8 },
    { value: 'NZ', label: 'New Zealand', phoneCode: '+64', phoneLength: 9 },
    { value: 'PE', label: 'Peru', phoneCode: '+51', phoneLength: 9 },
    { value: 'PH', label: 'Philippines', phoneCode: '+63', phoneLength: 10 },
    { value: 'PK', label: 'Pakistan', phoneCode: '+92', phoneLength: 10 },
    { value: 'PL', label: 'Poland', phoneCode: '+48', phoneLength: 9 },
    { value: 'PT', label: 'Portugal', phoneCode: '+351', phoneLength: 9 },
    { value: 'QA', label: 'Qatar', phoneCode: '+974', phoneLength: 8 },
    { value: 'RO', label: 'Romania', phoneCode: '+40', phoneLength: 9 },
    { value: 'RU', label: 'Russia', phoneCode: '+7', phoneLength: 10 },
    { value: 'SA', label: 'Saudi Arabia', phoneCode: '+966', phoneLength: 9 },
    { value: 'SE', label: 'Sweden', phoneCode: '+46', phoneLength: 9 },
    { value: 'SG', label: 'Singapore', phoneCode: '+65', phoneLength: 8 },
    { value: 'TH', label: 'Thailand', phoneCode: '+66', phoneLength: 9 },
    { value: 'TR', label: 'Turkey', phoneCode: '+90', phoneLength: 10 },
    { value: 'TW', label: 'Taiwan', phoneCode: '+886', phoneLength: 9 },
    { value: 'UA', label: 'Ukraine', phoneCode: '+380', phoneLength: 9 },
    { value: 'US', label: 'United States', phoneCode: '+1', phoneLength: 10 },
    { value: 'VE', label: 'Venezuela', phoneCode: '+58', phoneLength: 10 },
    { value: 'VN', label: 'Vietnam', phoneCode: '+84', phoneLength: 9 },
    { value: 'ZA', label: 'South Africa', phoneCode: '+27', phoneLength: 9 }
];
  // Function to extract country code from phone number
const extractCountryCode = (phoneNumber) => {
    if (!phoneNumber) return null;
    
    // Find the longest matching country code (to handle cases like +1 and +123)
    const matchedCountries = countryOptions
        .filter(option => option.phoneCode && phoneNumber.startsWith(option.phoneCode))
        .sort((a, b) => b.phoneCode.length - a.phoneCode.length);
    
    return matchedCountries.length > 0 ? matchedCountries[0] : null;
};


const validatePhoneNumber = (phoneNumber, country) => {
    if (!phoneNumber || !country) return false;
    
    // Remove country code for validation
    const numberWithoutCode = phoneNumber.replace(country.phoneCode, '').replace(/\D/g, '');
    
    // Check if the number has the exact required length
    if (numberWithoutCode.length !== country.phoneLength) {
        return false;
    }
    
    // Check if the remaining number contains only digits
    return /^\d+$/.test(numberWithoutCode);
};

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    let newValue = value;
    // If empty, clear everything
    if (!value) {
        setFormData1(prev => ({
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
    
    // Ensure the input starts with +
    if (!value.startsWith('+')) {
        newValue = '+' + value.replace(/[^0-9]/g, '');
    } else {
        // Keep only + and digits
        newValue = '+' + value.slice(1).replace(/[^0-9]/g, '');
    }
    
    // Find country by code
    const country = extractCountryCode(newValue);
    
    if (country) {
        // Check if we've reached the maximum length (country code + phone length)
        const maxLength = country.phoneCode.length + country.phoneLength;
        if (newValue.length > maxLength) {
            // Trim to maximum length
            newValue = newValue.substring(0, maxLength);
        }
        
        // Validate the phone number format for the detected country
        const isValid = validatePhoneNumber(newValue, country);
        
        setFormData1(prev => ({
            ...prev,
            clientInfo: {
                ...prev.clientInfo,
                phone: newValue,
                country: country.label
            }
        }));
        
        setErrors(prev => ({
            ...prev,
            phone: isValid ? '' : `Please enter a valid ${country.label} phone number (${country.phoneLength} digits)`,
            country: ''
        }));
    } else {
        // No matching country code found
        setFormData1(prev => ({
            ...prev,
            clientInfo: {
                ...prev.clientInfo,
                phone: newValue,
                country: ''
            }
        }));
        
        setErrors(prev => ({
            ...prev,
            phone: 'Country with this code is not acceptable. Please input a valid country code or select a country first.',
            country: 'Please select a valid country from the list'
        }));
    }
};

// Helper functions for website pages
const getDefaultWebsitePages = (type) => {
    switch(type) {
        case 'Portfolio':
            return ['Home', 'About', 'Work/Portfolio', 'Services', 'Contact']; // Basic showcase + contact
        case 'E-commerce':
            return ['Home', 'Shop', 'Product Page', 'Cart', 'Checkout', 'Contact']; // Minimum for selling
        case 'Corporate':
            return ['Home', 'About', 'Services', 'Team', 'Contact']; // Professional presence
        case 'Blog':
            return ['Home', 'Blog Feed', 'Single Post', 'About', 'Contact']; // Basic publishing
        default:
            return ['Home', 'About', 'Contact']; // Bare minimum
    }
};
const [currP, setCurrP] = useState(1);
     const [pagePage] = useState(5)
      const indexfirstString = (currP - 1) * pagePage;
     const indexlastString = currP * pagePage;
   //  const curreBlogs = filterBlog.slice(indexfirstString, indexlastString)

const getAdditionalWebsitePages = (type) => {
    switch(type) {
       // In your form component:
case 'Portfolio':
    return [
        // Project Showcase
        'Work',              // Main projects grid
        'Projects',          // Alternative to "Work"
        'Case Studies',     // Detailed project breakdowns
        'Gallery',          // Visual portfolio
        
        // Professional Credentials
        'Resume',           // Downloadable CV
        'Skills',           // Tech stack visualization
        'Certifications',   // Industry credentials
        'Awards',          // Recognitions
        
        // Client Proof
        'Testimonials',     // Client feedback
        'Clients',          // Past collaborators
        'Press',           // Media features
        
        // Services
        'Services',         // Offerings list
        'Pricing',         // Service packages
        'Process',         // Work methodology
        
        // Content
        'Blog',            // Articles
        'Tutorials',       // How-to guides
        'Resources',       // Free tools/templates
        'Books',           // Publications
        
        // Interactive
        'Playground',      // Code demos
        'Experiments',     // Side projects
        'Live Demo',       // Interactive preview
        
        // Client Tools
        'Client Portal',   // Secure access
        'Collaborate',     // How to work together
        'Onboarding',      // New client process
        
        // Utility
        'FAQ',             // Common questions
        'Status'           // System updates
    ];
    case 'E-commerce':
  return [
    // Products
    'Shop',
    'Categories',
    'New',
    'Bestsellers',
    'Deals',
    'Featured',

    // Product Views
    'Item',
    'Variants',
    'Reviews',
    'Related',
    'Viewed',

    // Shopping
    'Wishlist',
    'Compare',
    'Gifts',
    'Quiz',

    // Checkout
    'Cart',
    'Checkout',
    'Tracking',
    'Orders',
    'Returns',

    // Account
    'Account',
    'Addresses',
    'Payments',
    'Subscriptions',

    // Support
    'Blog',
    'Guides',
    'Sizing',
    'Care',
    'FAQ',
    'Support',

    // Business
    'Wholesale',
    'Affiliate',
    'Jobs',
    'Eco'
  ];
        case 'Corporate':
  return [
    // Core
    'Company',
    'Leadership',
    'Team',
    'Values',
    'History',

    // Work
    'Work',
    'Cases',
    'Clients',
    'Results',
    'Approach',

    // Sectors
    'Industries',
    'Services',
    'Solutions',
    'Tech',
    'Partners',

    // News
    'News',
    'Press',
    'Events',
    'Blog',
    'Media',

    // Investors
    'Investors',
    'Stock',
    'Reports',
    'Governance',
    'ESG',

    // Careers
    'Careers',
    'Jobs',
    'Culture',
    'Interns',
    'Benefits',

    // Tools
    'Login',
    'Portal',
    'Contact',
    'Locations',
    'FAQ'
  ];
        case 'Blog':
  return [
    // Core Content
    'Posts',          // Main article feed
    'Latest',         // Recent content
    'Popular',        // Top-performing
    'Series',         // Multi-part content
    'Tags',           // Topic taxonomy
    'Search',         // Content finder

    // Content Types
    'News',           // Timely updates
    'Tutorials',      // How-to guides
    'Reviews',        // Product/service critiques
    'Interviews',     // Expert conversations
    'Opinion',        // Editorial content

    // Multimedia
    'Podcast',        // Audio episodes
    'Videos',         // Video content
    'Gallery',        // Visual content

    // Community
    'Contribute',     // Guest posts
    'Comments',       // Discussion hub
    'Forum',         // Community space
    'Events',        // Meetups/webinars

    // Monetization
    'Shop',          // Merch/products
    'Sponsors',      // Brand partners
    'Ads',           // Media kit
    'Donate',        // Reader support

    // Utility
    'Subscribe',     // Email/RSS
    'Archive',       // Historical posts
    'About',        // Blog mission
    'Contact'       // Reader outreach
  ];
       
  case 'other':
   return formData1.serviceSelection.websiteDetails.additionalPages;
  default:
            return formData1.serviceSelection.websiteDetails.additionalPages;
    }
};

const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (['Enter', ',', ' '].includes(e.key)) {
      e.preventDefault();
      addChip();
    }
  };

    const addChip = () => {
    const value = inputValue.trim();
    if (value && !chips.includes(value)) {
      setChips([...chips, value]);
      setInputValue('');
      setFormData1(prev => ({
            ...prev,
            serviceSelection: {
                ...prev.serviceSelection,
                websiteDetails:{
                  ...prev.serviceSelection.websiteDetails,
                  additionalPages: [...prev.serviceSelection.websiteDetails.additionalPages, value]
                }
               
            }
        }));
       //onChange={(e) => handleChange1(e, 'serviceSelection', 'websiteDetails')}
    console.log("all form data", formData1)
  };
    }

  const removeChip = (index) => {
    setChips(chips.filter((_, i) => i !== index));
  };
// Helper functions for app screens
const getDefaultAppScreens = (type) => {
    switch(type) {
        case 'Mobile':
            return ['Login', 'Home', 'Profile', 'Core Feature', 'Settings']; // Basic app flow
        case 'Web':
            return ['Login', 'Dashboard', 'Primary View', 'Profile', 'Help']; // Web app essentials
        case 'Hybrid':
            return ['Login', 'Home', 'Main Feature', 'Profile', 'Settings']; // Cross-platform core
        case 'Enterprise':
            return ['Login', 'Dashboard', 'Data View', 'Admin', 'Settings']; // Business critical
        default:
            return ['Login', 'Home', 'Profile', 'Settings']; // Absolute minimum
    }
};

const getAdditionalAppScreens = (type) => {
    switch(type) {
        case 'Mobile':
            return [
                'In-App Messaging', // User communication
                'Analytics', // User insights
                'Payment Gateway', // Monetization
                'Offline Mode', // Enhanced UX
                'AR Viewer', // Advanced features
                'Premium Content' // Upsell opportunity
            ];
        case 'Web':
            return [
                'Real-time Collaboration', // Team features
                'Advanced Reporting', // Business intelligence
                'File Management', // Document handling
                'Calendar Integration', // Productivity
                'API Console', // For developer tools
                'Billing Portal' // Subscription management
            ];
        case 'Hybrid':
            return [
                'Cross-device Sync', // Seamless experience
                'Media Library', // Content management
                'Push Notifications', // Engagement
                'Geolocation', // Location features
                'Dark Mode', // UX enhancement
                'Accessibility Panel' // Inclusive design
            ];
        case 'Enterprise':
            return [
                'Audit Trail', // Compliance
                'Approval Workflows', // Process automation
                'Single Sign-On', // Security
                'Data Export', // Reporting
                'System Health', // Monitoring
                'Role Management' // Permissions
            ];
        default:
            return [
                'Chat',
                'Payments',
                'Analytics',
                'Notifications',
                'Search',
                'Help Center'
            ];
    }
};
// Handle country selection changes
    const handleCountryChange = (e) => {
        const { value } = e.target;
        const selectedCountry = countryOptions.find(option => option.label === value);
        
        setFormData1(prev => ({
            ...prev,
            clientInfo: {
                ...prev.clientInfo,
                country: selectedCountry?.label,
                phone: selectedCountry?.phoneCode || ''
            }
        }));
        
        setErrors(prev => ({
            ...prev,
            country: '',
            phone: value ? '' : 'Please select your country'
        }));
    };

 const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData1.clientInfo.firstName) newErrors.firstName = 'First name is required';
      if (!formData1.clientInfo.lastName) newErrors.lastName = 'Last name is required';
      if (!formData1.clientInfo.email) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData1.clientInfo.email)) {
        newErrors.email = 'Your email is invalid';
      }
      if (!formData1.clientInfo.phone) newErrors.phone = 'Phone is required';
      if (!formData1.clientInfo.company) newErrors.company = 'Your Company/Business/Organization is required';
      if (!formData1.clientInfo.country) newErrors.country = 'Your Country is required';
       if (!formData1.clientInfo.contactMethod) newErrors.contactMethod = 'Your must select a Contact method';

//if (!formData1.clientInfo.company) newErrors.company = 'Your Company/Business/Organization is required';
    }

    if (step === 2) {

        if (!formData1.serviceSelection.serviceType) newErrors.serviceType = "This field cannot be empty";

      if (formData1.serviceSelection.serviceType === 'Website Development' && formData1.engagementType == 'project') {
          if (!formData1.serviceSelection.websiteDetails.type) newErrors.websiteDetailsType = 'The Website type must be provided';
      }
      else if (formData1.serviceSelection.serviceType === 'App Development' && formData1.engagementType == 'project') {
          if (!formData1.serviceSelection.appDetails.type) newErrors.appDetailsType = 'The app type must be provided';
      }
       
     // if(!formData1.project.price) newErrors.price = 'Select a price budget to proceed';
      // if (formData1.payment.method === 'card') {
      //   if (!formData1.payment.cardNumber) newErrors.cardNumber = 'Card number is required';
      //   else if (formData1.payment.cardNumber.length < 19){
      //     console.log("!/^\d{19}$/.test(formData1.payment.cardNumber)", /^\d{19}$/.test(formData1.payment.cardNumber))
      //     newErrors.cardNumber = 'Card number must be 16 digits';}

      //   if (!formData1.payment.cardName) newErrors.cardName = 'Name on card is required';

      //   if (!formData1.payment.expiry) newErrors.expiry = 'Expiry date is required';
      //   else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData1.payment.expiry)) newErrors.expiry = 'Invalid expiry (MM/YY)';

      //   if (!formData1.payment.cvv) newErrors.cvv = 'CVV is required';
      //   else if (!/^\d{3,4}$/.test(formData1.payment.cvv)) newErrors.cvv = 'CVV must be 3-4 digits';
      // }

      // if (formData1.payment.method === 'bank') {
      //   if (!formData1.payment.bankAccount) newErrors.bankAccount = 'Account number is required';
      //   if (!formData1.payment.bankRouting) newErrors.bankRouting = 'Routing number is required';
      //   if (!formData1.payment.bankName) newErrors.bankName = 'Bank name is required';
      // }
    }

   

    setErrors(newErrors);
    setTimeout(() => {
      setErrors({})
    },5000);
    return Object.keys(newErrors).length === 0;
  };

   const prevStep = () => {
    setStep(step - 1);
     };
     
     const  HandleSubmitForm = async (e) => {
      setIsLoading(true);
     
      e.preventDefault();
        
         try {
          const response =  await axios.post('api/contacts', formData1);

          if (response.data.success === true) {
                  setStep(1)
    setIsSubmitted(true);
    setIsLoading(true)
          setTimeout(() => {
            setIsSubmitted(false);
            setIsLoading(false)
          }, 4000);

setFormData1({
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
    engagementType: 'project',
    serviceSelection: {
      serviceType: 'Website Development',
      websiteDetails: {
            type: '',
            customDescription: '',
            defaultPages: ['Home', 'About', 'Contact', 'PrivacyPolicy', 'TermsOfService',  '404'],  // Changed from defaultFeatures
            additionalPages: []  // Changed from additionalFeatures
        },
        appDetails: {
            type: '',
            customDescription: '',
            defaultScreens: ['Splash', 'Auth', 'Home', 'Profile', 'Settings', 'Error'],  // For apps we'll use "screens" instead of "pages"
            additionalScreens: [],
        },
      designDetails: {
        type: '',
        customDescription: ''
      },
      databaseDetails: {
        needs: []
      },
      telecomDetails: {
        needs: [],
        customDescription: ''
      },
      employmentDetails: {
        roleType: '',
        jobTitle: '',
        industry: '',
        salaryExpectation: '',
        jobDescription: ''
      }
    },
    projectInfo: {
      startDate: '',
      deadline: '',
      budgetRange: '',
      notes: '',
      urgency: ''
    }
  })

}   
  
        else if (response.data.success === false) {
              toast.error("Failed to send Message");
                setIsSubmitted(false);
            setIsLoading(false)
              setErrors(prev => ({
            ...prev,
              ErrorMessage: response.data.data
        }));

        setTimeout(() => {
              setErrors(prev => ({
            ...prev,
              ErrorMessage: '',
        }));
        }, 5000);
          }

          
           setIsLoading(false);
      
         

         } catch (error) {

           setErrors(prev => ({
            ...prev,
              ErrorMessage: "An error occurred while sending your message. Please try again later."
        }));

        setTimeout(() => {
              setErrors(prev => ({
            ...prev,
              ErrorMessage: '',
        }));
        }, 5000);
         }
         finally{
          setTimeout(() => {
            setIsLoading(false);
          }, 4000);
         }
        
     }

  return (
    <>
      <Head>
        <title>MYG Tech - Contact us</title>
        <meta name="description" content="Get in touch with a top-tier web and app developer for your next project" />
      </Head>

     
      <div className="ContactPageSec" onMouseMove={handleMouseMove}>
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
    <div 
      className="ContactPageSec__infoSection"
      data-aos="fade-right"
    >
      <h2 
        className="ContactPageSec__infoTitle"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Let's Build Something Amazing
      </h2>
      <p 
        className="ContactPageSec__infoSubtitle"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        Have a project in mind or want to discuss potential opportunities?
        I'd love to hear from you! Whether you need a website, mobile app,
        database solution, or telecom expertise, let's make it happen.
      </p>
      
      <div 
        className="ContactPageSec__availability"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="ContactPageSec__availabilityDot"></div>
        <span>Available for contract work or full-time positions</span>
      </div>

      <div 
        className="ContactPageSec__availability"
        data-aos="fade-up"
        data-aos-delay="250"
      >
        <div className="ContactPageSec__availabilityDot"></div>
        <span>Specializing in complex, high-performance solutions</span>
      </div>
      
      <div 
        className="ContactPageSec__infoItems"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <a 
          className="ContactPageSec__infoItem" 
          href='tel:+1234567890' 
          target='_blank' 
          rel="noreferrer"
          data-aos="zoom-in"
          data-aos-delay="350"
        >
          <div className="ContactPageSec__infoIcon">
            <FaPhone />
          </div>
          <div>
            <h4>Phone</h4>
            <p>(+237) 651-497-070</p>
          </div>
        </a>

        <a 
          className="ContactPageSec__infoItem" 
          href='mailto:contact@example.com' 
          target='_blank' 
          rel="noreferrer"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <div className="ContactPageSec__infoIcon">
            <FaEnvelope />
          </div>
          <div>
            <h4>Email</h4>
            <p>makiayengue@gmailcom</p>
          </div>
        </a>

        <a 
          className="ContactPageSec__infoItem" 
          href='https://linkedin.com/in/makia-yengue-godwill-lavie-7aba12258' 
          target='_blank' 
          rel="noreferrer"
          data-aos="zoom-in"
          data-aos-delay="450"
        >
          <div className="ContactPageSec__infoIcon">
            <FaLinkedin />
          </div>
          <div>
            <h4>LinkedIn</h4>
            <p>MYG Tech</p>
          </div>
        </a>

        <a 
          className="ContactPageSec__infoItem" 
          href='https://github.com/Makirow-MY' 
          target='_blank' 
          rel="noreferrer"
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          <div className="ContactPageSec__infoIcon">
            <FaGithub />
          </div>
          <div>
            <h4>GitHub</h4>
            <p>MYG Tech</p>
          </div>
        </a>
      </div>
    </div>

    {/* Right side - Contact form */}
    <div 
      className="ContactPageSec__formSection"
      data-aos="fade-left"
    >
      {isSubmitted ? (
        <div 
          className="ContactPageSec__successMessage"
          data-aos="zoom-in"
        >
          <svg className="ContactPageSec__successIcon" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
          <h3>Message Sent Successfully!</h3>
          <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
        </div>
      ) : (
        <>
          <h2 
            className="ContactPageSec__formTitle" 
            style={{textAlign:'left'}}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Get In Touch
          </h2>

          <form className="leaveareplyform w-100">
            {/* Step 1: Contact Information */}
            {step === 1 && (
              <div 
                className="form-step"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <h3 data-aos="fade-up" data-aos-delay="200">Your Contact Information</h3>
                <div 
                  className="nameemailcomment"
                  data-aos="fade-up"
                  data-aos-delay="250"
                >
                  <div className="form-group">
                    <label htmlFor="firstName" className="ContactPageSec__formLabel">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData1.clientInfo.firstName}
                      onChange={(e) => handleChange1(e, 'clientInfo')}
                      className="ContactPageSec__formInput"
                      required
                      data-aos="fade-right"
                      data-aos-delay="300"
                    />
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName" className="ContactPageSec__formLabel">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData1.clientInfo.lastName}
                      onChange={(e) => handleChange1(e, 'clientInfo')}
                      className="ContactPageSec__formInput"
                      required
                      data-aos="fade-left"
                      data-aos-delay="300"
                    />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                  </div>
                </div>

                <div 
                  className="nameemailcomment"
                  data-aos="fade-up"
                  data-aos-delay="350"
                >
                  <div className="form-group">
                    <label htmlFor="email" className="ContactPageSec__formLabel">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData1.clientInfo.email}
                      onChange={(e) => handleChange1(e, 'clientInfo')}
                      className="ContactPageSec__formInput"
                      required
                      data-aos="fade-right"
                      data-aos-delay="400"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="company" className="ContactPageSec__formLabel">Company/Business</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData1.clientInfo.company}
                      onChange={(e) => handleChange1(e, 'clientInfo')}
                      className="ContactPageSec__formInput"
                      required={formData1.engagementType === 'employ'}
                      data-aos="fade-left"
                      data-aos-delay="400"
                    />
                    {errors.company && <span className="error">{errors.company}</span>}
                  </div>
                </div>

                <div 
                  className="nameemailcomment"
                  data-aos="fade-up"
                  data-aos-delay="450"
                >
                  <div className="form-group">
                    <label htmlFor="phone" className="ContactPageSec__formLabel">Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData1.clientInfo.phone}
                      onChange={handlePhoneChange}
                      className="ContactPageSec__formInput"
                      data-aos="fade-right"
                      data-aos-delay="500"
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor='country' className="ContactPageSec__formLabel">Country</label>
                    <select
                      name="country"
                      id='country'
                      value={formData1.clientInfo.country}
                      onChange={handleCountryChange}
                      required
                      data-aos="fade-left"
                      data-aos-delay="500"
                    >
                      <option value="">Select your country</option>
                      {countryOptions.map(option => (
                        <option key={option.value} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.country && <span className="error">{errors.country}</span>}
                  </div>
                </div>

                <div 
                  className="form-group"
                  data-aos="fade-up"
                  data-aos-delay="550"
                >
                  <label htmlFor='referralSource' className="ContactPageSec__formLabel">How did you hear about me?</label>
                  <select
                    name="referralSource"
                    id='referralSource'
                    value={formData1.clientInfo.referralSource}
                    onChange={(e) => handleChange1(e, 'clientInfo')}
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    <option value="">Select an option</option>
                    <option value="Google Search">Google Search</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="GitHub">GitHub</option>
                    <option value="Personal Recommendation">Personal Recommendation</option>
                    <option value="Portfolio Site">Portfolio Site</option>
                    <option value="Other">Other</option>
                  </select>
                  {formData1.clientInfo.referralSource === 'Other' && (
                    <input
                      type="text"
                      placeholder="Please specify"
                      name="referralSourceOther"
                      value={formData1.clientInfo.referralSourceOther || ''}
                      onChange={(e) => handleChange1(e, 'clientInfo')}
                      className="ContactPageSec__formInput mt-2"
                      data-aos="fade-up"
                      data-aos-delay="650"
                    />
                  )}
                </div>

                <div 
                  className="rightconttitle"
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  <h2>Contact Method</h2>
                </div>
                <div 
                  className="rightcontredio" 
                  style={{
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    paddingBottom: errors.contactMethod ? '0' : '3rem'
                  }}
                  data-aos="fade-up"
                  data-aos-delay="750"
                >
                  {['Email', 'WhatsApp', 'Telegram'].map((method) => (
                    <div 
                      key={method} 
                      className='radio-button'
                      data-aos="zoom-in"
                      data-aos-delay={800 + (['Email', 'WhatsApp', 'Telegram'].indexOf(method) * 50)}
                    >                          
                      <input 
                        style={{ padding:'10px', borderWidth: '2px'}} 
                        type='radio' 
                        value={method}
                        name='contactMethod'
                        id={method}
                        checked={formData1.clientInfo.contactMethod === method}
                        onChange={(e) => handleChange1(e, 'clientInfo')}
                      />
                      <span className='radio'></span>
                      <label style={{cursor:'pointer'}} htmlFor={method}>
                        {method}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.contactMethod && <span className="error" style={{marginBottom: '2rem'}}>{errors.contactMethod}</span>}

                <div 
                  className="form-actions"
                  data-aos="fade-up"
                  data-aos-delay="900"
                >
                  <button type="button" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Engagement Details */}
            {step === 2 && (
              <div 
                className="form-step"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <h3 data-aos="fade-up" data-aos-delay="200">Engagement Information</h3>

                <div 
                  className="payment-methods"
                  data-aos="fade-up"
                  data-aos-delay="250"
                >
                  <label 
                    className={`payment-method ${formData1.engagementType === 'project' ? 'selected' : ''}`}
                    data-aos="zoom-in"
                    data-aos-delay="300"
                  >
                    <input
                      type="radio"
                      name="engagementType"
                      value="project"
                      checked={formData1.engagementType === 'project'}
                      onChange={handleChange}
                    />
                    <div className="method-content">
                      <div className="method-icon"><FaHandshake/></div>
                      <span>Project Work</span>
                    </div>
                  </label>
                  
                  <label 
                    className={`payment-method ${formData1.engagementType === 'employment' ? 'selected' : ''}`}
                    data-aos="zoom-in"
                    data-aos-delay="350"
                  >
                    <input
                      type="radio"
                      name="engagementType"
                      value="employment"
                      checked={formData1.engagementType === 'employment'}
                      onChange={handleChange}
                    />
                    <div className="method-content">
                      <div className="method-icon"><FaUserFriends/></div>
                      <span>Join My Team</span>
                    </div>
                  </label>
                </div>

                {/* Project Work Section */}
                {formData1.engagementType === 'project' && (
                  <>
                    {!allform ? (
                      <>
                        <div 
                          className="form-group"
                          data-aos="fade-up"
                          data-aos-delay="400"
                        >
                          <label htmlFor="serviceType" className="ContactPageSec__formLabel">
                            What service are you interested in?
                          </label>
                          <select
                            name="serviceType"
                            value={formData1.serviceSelection.serviceType}
                            onChange={(e) => handleChange1(e, 'serviceSelection')}
                            required
                          >
                            <option value="">Select a service</option>
                            <option value="Website Development">Website Development</option>
                            <option value="App Development">App Development</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Database Management">Database Management</option>
                            <option value="Telecom Engineering">Telecom Engineering</option>
                          </select>
                          {errors.serviceType && <span className="error">{errors.serviceType}</span>}
                        </div>

                        {/* Rest of your project form fields with similar data-aos attributes */}
                        {/* ... */}

                        <div 
                          className="form-actions"
                          data-aos="fade-up"
                          data-aos-delay="800"
                        >
                          <button
                            type="button"
                            onClick={() => setAllForm(true)}
                            className="btn-secondary"
                          >
                            <FaChevronRight />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Project Information fields with data-aos attributes */}
                        {/* ... */}

                        <div 
                          className="form-actions"
                          data-aos="fade-up"
                          data-aos-delay="800"
                        >
                          <button
                            type="button"
                            onClick={() => setAllForm(false)}
                            className="btn-secondary"
                            style={{marginLeft: 'auto'}}
                          >
                            <FaChevronLeft />
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* Employment Section */}
                {formData1.engagementType === 'employment' && (
                  <div 
                    className="service-details"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    {/* Employment fields with data-aos attributes */}
                    {/* ... */}
                  </div>
                )}

                <div 
                  className="form-actions"
                  data-aos="fade-up"
                  data-aos-delay="900"
                >
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-secondary"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={HandleSubmitForm}
                    className="btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="ContactPageSec__spinner"></span>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
                {errors.ErrorMessage && (
                  <span 
                    style={{
                      fontSize: '15px', 
                      color: 'red', 
                      padding: '1rem', 
                      borderRadius:'5px', 
                      background:'rgba(255,0,0,0.2)'
                    }}
                    data-aos="fade-up"
                    data-aos-delay="950"
                  >
                    {errors.ErrorMessage}
                  </span>
                )}
              </div>
            )}
          </form>
        </>
      )}
    </div>
  </div>
</div>
    </>
  );
};

export default ContactPage;