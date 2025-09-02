import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

       });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset submission status after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

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
    hidden: { y: 20, opacity: 0 },
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


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;


        // Normal form field handling
        if (name.includes('.')) {
            const [section, field] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

  const nextStep = (e) => {
      e.preventDefault();
    if (validateStep(step)) {
      setStep(step + 1);
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
        setFormData(prev => ({
            ...prev,
            personal: {
                ...prev.personal,
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
        
        setFormData(prev => ({
            ...prev,
            personal: {
                ...prev.personal,
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
        // No matching country code found
        setFormData(prev => ({
            ...prev,
            personal: {
                ...prev.personal,
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


// Handle country selection changes
    const handleCountryChange = (e) => {
        const { value } = e.target;
        const selectedCountry = countryOptions.find(option => option.value === value);
        
        setFormData(prev => ({
            ...prev,
            personal: {
                ...prev.personal,
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
//const [project, setproject] = useState([])

const handleProjectChange = (project) =>{
  if (formData.project.projectName.includes(project)) {
    setFormData(prev => ({
            ...prev,
            project: {
                ...prev.project,
                projectName: formData.project.projectName.filter(pro => pro !== project),
               
            }
        })); 
  }
  else{
    setFormData(prev => ({
            ...prev,
            project: {
                ...prev.project,
                projectName: [...formData.project.projectName, project],
               
            }
        })); 
  }
  
}
 const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.personal.firstName) newErrors.firstName = 'First name is required';
      if (!formData.personal.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.personal.email) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.personal.email)) {
        newErrors.email = 'Your email is invalid';
      }
      if (!formData.personal.phone) newErrors.phone = 'Phone is required';
      if (!formData.personal.company) newErrors.address = 'Your Company/Business/Organization is required';
      if (!formData.personal.country) newErrors.country = 'Country is required';
    }

    if (step === 2) {
      // if (!formData.payment.method) newErrors.method = 'Payment method is required';

      // if (formData.payment.method === 'card') {
      //   if (!formData.payment.cardNumber) newErrors.cardNumber = 'Card number is required';
      //   else if (formData.payment.cardNumber.length < 19){
      //     console.log("!/^\d{19}$/.test(formData.payment.cardNumber)", /^\d{19}$/.test(formData.payment.cardNumber))
      //     newErrors.cardNumber = 'Card number must be 16 digits';}

      //   if (!formData.payment.cardName) newErrors.cardName = 'Name on card is required';

      //   if (!formData.payment.expiry) newErrors.expiry = 'Expiry date is required';
      //   else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.payment.expiry)) newErrors.expiry = 'Invalid expiry (MM/YY)';

      //   if (!formData.payment.cvv) newErrors.cvv = 'CVV is required';
      //   else if (!/^\d{3,4}$/.test(formData.payment.cvv)) newErrors.cvv = 'CVV must be 3-4 digits';
      // }

      // if (formData.payment.method === 'bank') {
      //   if (!formData.payment.bankAccount) newErrors.bankAccount = 'Account number is required';
      //   if (!formData.payment.bankRouting) newErrors.bankRouting = 'Routing number is required';
      //   if (!formData.payment.bankName) newErrors.bankName = 'Bank name is required';
      // }
    }

    if (step === 3 && !formData.billing.sameAsShipping) {
      // if (!formData.billing.address) newErrors.billingAddress = 'Billing address is required';
      // if (!formData.billing.city) newErrors.billingCity = 'Billing city is required';
      // if (!formData.billing.country) newErrors.billingCountry = 'Billing country is required';
      // if (!formData.billing.zipCode) newErrors.billingZipCode = 'Billing zip code is required';
    }

    setErrors(newErrors);
    setTimeout(() => {
      setErrors({})
    }, 3000);
    return Object.keys(newErrors).length === 0;
  };

   const prevStep = () => {
    setStep(step - 1);
     };

  return (
    <>
      <Head>
        <title>MYG Tech - Contact</title>
        <meta name="description" content="Get in touch with a top-tier web and app developer for your next project" />
      </Head>

      <motion.div
        className={"ContactPageSec"}
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
        {/* Decorative elements */}
        <div className={"ContactPageSec__decorativeCircle1"}></div>
        <div className={"ContactPageSec__decorativeCircle2"}></div>
        <div className={"ContactPageSec__decorativeDots"}></div>

        <div className={"ContactPageSec__container"}>
          {/* Left side - Contact info */}
          <motion.div
            className={"ContactPageSec__infoSection"}
            variants={itemVariants}
          >
            <h2 className={"ContactPageSec__infoTitle"}>Let's Build Something Amazing</h2>
            <p className={"ContactPageSec__infoSubtitle"} >
             Have a project in mind or want to discuss potential opportunities?
              I'd love to hear from you!
              You can can message me directly through the form or through 
               other means 
            </p>
             
             <div className={"ContactPageSec__availability"}>
              <div className={"ContactPageSec__availabilityDot"}></div>
              <span>Always ready to be of used to you</span>
            </div>

            <div className={"ContactPageSec__infoItems"}>
              
              <a className={"ContactPageSec__infoItem"} href='tel:+237651497070' target='_blank' >
                <div className={"ContactPageSec__infoIcon"}>
                  <FaPhone />
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </a>

              <a className={"ContactPageSec__infoItem"} href='mailto:makiayengue@gmail.com' target='_blank'>
                <div className={"ContactPageSec__infoIcon"}>
                  <FaEnvelope />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>makiayengue@gmail.com</p>
                </div>
              </a>

              <a className={"ContactPageSec__infoItem"} href='/' target='_blank'>
                <div className={"ContactPageSec__infoIcon"}>
                  <FaLinkedin />
                </div>
                <div>
                  <h4>LindedIn</h4>
                  <p>MYG Tech</p>
                </div>
              </a>

              <a className={"ContactPageSec__infoItem"} href='/' target='_blank'>
                <div className={"ContactPageSec__infoIcon"}>
                  <FaTwitter />
                </div>
                <div>
                  <h4>Twitter</h4>
                  <p>@MYG Tech</p>
                </div>
              </a>

            </div>

          
          </motion.div>

          {/* Right side - Contact form */}
          <motion.div
            className={"ContactPageSec__formSection"}
            variants={itemVariants}
          >
            {isSubmitted ? (
              <motion.div
                className={"ContactPageSec__successMessage"}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg className={"ContactPageSec__successIcon"} viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <>
                <h2 className={"ContactPageSec__formTitle"}>Send direct Message</h2>
               
                <form  className={"leaveareplyform w-100"}>
                 {step === 1 &&  (
                  <>
                  <h3>Your Contact Information</h3>
                  <div className='nameemailcomment'>

<div className={"form-group"}>
                    <label htmlFor="firstName" className={"ContactPageSec__formLabel"}>First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="personal.firstName"
                      value={formData.personal.firstName}
                      onChange={handleChange}
                      className={"ContactPageSec__formInput"}
                     />
                     {errors.firstName && <span className="error">{errors.firstName}</span>}
                  </div>

                                    <div className={"form-group"}>
                    <label htmlFor="lastName" className={"ContactPageSec__formLabel"}>Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="personal.lastName"
                      value={formData.personal.lastName}
                      onChange={handleChange}
                      className={"ContactPageSec__formInput"}
                    />
                     {errors.lastName && <span className="error">{errors.lastName}</span>}
                  </div>

                  </div>
                                    

<div className='nameemailcomment'>

<div className={"form-group"}>
                    <label htmlFor="email" className={"ContactPageSec__formLabel"}>Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="personal.email"
                      value={formData.personal.email}
                      onChange={handleChange}
                      className={"ContactPageSec__formInput"}
                    />
                     {errors.email && <span className="error">{errors.email}</span>}
                  </div>


                 <div className={"form-group"}>
                    <label htmlFor="company" className={"ContactPageSec__formLabel"}>Company</label>
                    <input
                      type="text"
                      id="company"
                      name="personal.company"
                      value={formData.personal.company}
                      onChange={handleChange}
                      className={"ContactPageSec__formInput"}
                    />
                     {errors.company && <span className="error">{errors.company}</span>}
                  </div>

</div>
                  

                  <div className='nameemailcomment'>


<div className={"form-group"}>
                    <label htmlFor="phone" className={"ContactPageSec__formLabel"}>Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      name="personal.phone"
                      value={formData.personal.phone}
                      onChange={handlePhoneChange}
                      className={"ContactPageSec__formInput"}
                     />
                     {errors.phone && <span className="error">{errors.phone}</span>}
                  </div>


 <div className="form-group">

                <label htmlFor='country' className={"ContactPageSec__formLabel"}>Country</label>
                <select
                    name="personal.country"
                    id='country'
                    value={formData.personal.country}
                    onChange={handleCountryChange}
                >
                    {countryOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {errors.country && <span className="error">{errors.country}</span>}
            </div>
                  </div>

                  </>
                 )}

                 {step === 2 &&  (
                  <>
                  <h3>Project Information</h3>

                  <div className='rightconttitle '>
<h2 >What service do you need for your project?</h2>
                  </div>
                  <div className='rightcontcheckbox'>
                      {[
                         'Website Development',
                         'App Development',
                         'Database Management',
                         'E-commerce Site',
                         'Website Migration'
                      ].map((pro) => (
                        <label key={pro} className='cyberpunk-checkbox-label'>
                          
                            <input style={{width: 'auto', height:'auto', padding:'10px', borderWidth: '2px'}} type='checkbox' className='cyberpunk-checkbox'
                            value={pro}
                            checked={formData.project.projectName.includes(pro)}
                            onClick={() => handleProjectChange(pro)}
                            />{
                              pro
                            }
                          </label>
                      ))
                      
                      }
                  </div>

                    <div className='rightconttitle '>
<h2 >How much is the anticipation budget for the next project?</h2>
                  </div>
                                    


                  </>
                 )}


                  {/* <div className={"form-group"}>
                    <label htmlFor="message" className={"ContactPageSec__formLabel"}>Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.}
                      onChange={handleChange}
                      className={"ContactPageSec__formTextarea"}
                      rows="5"
                      required
                    ></textarea>
                  </div> */}

                  <button
                    type="submit"
                    onClick={nextStep}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className={"ContactPageSec__spinner"}></span>
                    ) : (
                      <>
                      Next
                        {/* <FaPaperPlane  className={"ContactPageSec__submitIcon"} />
                        Send Message */}
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ContactPage;