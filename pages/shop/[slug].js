import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {  EffectCoverflow } from "swiper/modules";


import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import axios from "axios";
import { useCart } from "@/components/Context";


export default function shopslug() {
 const router = useRouter();
    const {slug} = router.query;
    const {alldata, loading} = useFetchData(`/api/shops?slug=${slug}`)
     const [step, setStep] = useState(1);
      const [formData, setFormData] = useState({
         personal: {
           firstName: '',
           lastName: '',
           email: '',
           phone: '',
           address: '',
           city: '',
           country: '',
           zipCode: ''
         },
         payment: {
           method: '',
           cardNumber: '',
           cardName: '',
           expiry: '',
           cvv: '',
           bankAccount: '',
           bankRouting: '',
           bankName: ''
         },
         billing: {
           sameAsShipping: true,
           address: '',
           city: '',
           country: '',
           zipCode: ''
         }
       });
       const [errors, setErrors] = useState({});
       const [isProcessing, setIsProcessing] = useState(false);
       const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [mainImage, setMainImage] = useState('');
  // Currency conversion rates (simplified - in a real app, use an API)
 const currencyRates = {
    US: { code: 'USD', symbol: '$', rate: 1 },        // United States
    CA: { code: 'CAD', symbol: 'CA$', rate: 1.35 },   // Canada
    MX: { code: 'MXN', symbol: 'MX$', rate: 16.89 },  // Mexico
    BR: { code: 'BRL', symbol: 'R$', rate: 5.05 },    // Brazil
    AR: { code: 'ARS', symbol: '$', rate: 817.53 },   // Argentina
    UK: { code: 'GBP', symbol: '£', rate: 0.79 },     // United Kingdom
    DE: { code: 'EUR', symbol: '€', rate: 0.93 },     // Germany
    FR: { code: 'EUR', symbol: '€', rate: 0.93 },     // France
    IT: { code: 'EUR', symbol: '€', rate: 0.93 },     // Italy
    ES: { code: 'EUR', symbol: '€', rate: 0.93 },     // Spain
    RU: { code: 'RUB', symbol: '₽', rate: 91.45 },    // Russia
    TR: { code: 'TRY', symbol: '₺', rate: 32.04 },    // Turkey
    ZA: { code: 'ZAR', symbol: 'R', rate: 18.91 },    // South Africa
    NG: { code: 'NGN', symbol: '₦', rate: 1505.50 },  // Nigeria
    EG: { code: 'EGP', symbol: 'E£', rate: 30.90 },   // Egypt
    KE: { code: 'KES', symbol: 'KSh', rate: 157.50 }, // Kenya
    CM: { code: 'XAF', symbol: 'FCFA', rate: 608.25 }, // Cameroon
    CN: { code: 'CNY', symbol: '¥', rate: 7.24 },     // China
    JP: { code: 'JPY', symbol: '¥', rate: 151.61 },   // Japan
    IN: { code: 'INR', symbol: '₹', rate: 83.32 },    // India
    ID: { code: 'IDR', symbol: 'Rp', rate: 15887.50 }, // Indonesia
    TH: { code: 'THB', symbol: '฿', rate: 36.55 },    // Thailand
    AU: { code: 'AUD', symbol: 'A$', rate: 1.51 },    // Australia
    NZ: { code: 'NZD', symbol: 'NZ$', rate: 1.66 },   // New Zealand
    SA: { code: 'SAR', symbol: 'SR', rate: 3.75 },    // Saudi Arabia
    AE: { code: 'AED', symbol: 'د.إ', rate: 3.67 },   // UAE
    IL: { code: 'ILS', symbol: '₪', rate: 3.73 },     // Israel
    KR: { code: 'KRW', symbol: '₩', rate: 1351.27 },  // South Korea
    SG: { code: 'SGD', symbol: 'S$', rate: 1.35 },    // Singapore
    MY: { code: 'MYR', symbol: 'RM', rate: 4.74 }     // Malaysia
};


const countryOptions = [
    { value: '', label: 'Select Country' },
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'MX', label: 'Mexico' },
    { value: 'BR', label: 'Brazil' },
    { value: 'AR', label: 'Argentina' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'IT', label: 'Italy' },
    { value: 'ES', label: 'Spain' },
    { value: 'RU', label: 'Russia' },
    { value: 'TR', label: 'Turkey' },
    { value: 'ZA', label: 'South Africa' },
    { value: 'NG', label: 'Nigeria' },
    { value: 'EG', label: 'Egypt' },
    { value: 'KE', label: 'Kenya' },
    { value: 'CM', label: 'Cameroon' },
    { value: 'CN', label: 'China' },
    { value: 'JP', label: 'Japan' },
    { value: 'IN', label: 'India' },
    { value: 'ID', label: 'Indonesia' },
    { value: 'TH', label: 'Thailand' },
    { value: 'AU', label: 'Australia' },
    { value: 'NZ', label: 'New Zealand' },
    { value: 'SA', label: 'Saudi Arabia' },
    { value: 'AE', label: 'United Arab Emirates' },
    { value: 'IL', label: 'Israel' },
    { value: 'KR', label: 'South Korea' },
    { value: 'SG', label: 'Singapore' },
    { value: 'MY', label: 'Malaysia' }
];
const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
   const handleMouseMove = (e) => {
    setGlowPosition({
      x: e.clientX,
      y: e.clientY
    });
  };
  // Calculate converted amount
  const calculateConvertedAmount = () => {
    const baseAmount = alldata && alldata[0]?.price; // $100.00 USD base amount
    const countryCode = formData.billing.sameAsShipping 
      ? formData.personal.country 
      : formData.billing.country;
    
    const currency = currencyRates[countryCode] || currencyRates['US'];
    const convertedAmount = baseAmount * currency.rate;
    
    return {
      amount: convertedAmount.toFixed(2),
      symbol: currency.symbol,
      code: currency.code
    };
  };
 const { cartItems: dataFromHeader } = useCart();
  const convertedAmount = calculateConvertedAmount()
    const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.personal.firstName) newErrors.firstName = 'First name is required';
      if (!formData.personal.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.personal.email) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.personal.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.personal.phone) newErrors.phone = 'Phone is required';
      if (!formData.personal.address) newErrors.address = 'Address is required';
      if (!formData.personal.city) newErrors.city = 'City is required';
      if (!formData.personal.country) newErrors.country = 'Country is required';
      if (!formData.personal.zipCode) newErrors.zipCode = 'Zip code is required';
    }
    
    if (step === 2) {
      if (!formData.payment.method) newErrors.method = 'Payment method is required';
      
      if (formData.payment.method === 'card') {
        if (!formData.payment.cardNumber) newErrors.cardNumber = 'Card number is required';
        else if (!/^\d{16}$/.test(formData.payment.cardNumber)) newErrors.cardNumber = 'Card number must be 16 digits';
        
        if (!formData.payment.cardName) newErrors.cardName = 'Name on card is required';
        
        if (!formData.payment.expiry) newErrors.expiry = 'Expiry date is required';
        else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.payment.expiry)) newErrors.expiry = 'Invalid expiry (MM/YY)';
        
        if (!formData.payment.cvv) newErrors.cvv = 'CVV is required';
        else if (!/^\d{3,4}$/.test(formData.payment.cvv)) newErrors.cvv = 'CVV must be 3-4 digits';
      }
      
      if (formData.payment.method === 'bank') {
        if (!formData.payment.bankAccount) newErrors.bankAccount = 'Account number is required';
        if (!formData.payment.bankRouting) newErrors.bankRouting = 'Routing number is required';
        if (!formData.payment.bankName) newErrors.bankName = 'Bank name is required';
      }
    }
    
    if (step === 3 && !formData.billing.sameAsShipping) {
      if (!formData.billing.address) newErrors.billingAddress = 'Billing address is required';
      if (!formData.billing.city) newErrors.billingCity = 'Billing city is required';
      if (!formData.billing.country) newErrors.billingCountry = 'Billing country is required';
      if (!formData.billing.zipCode) newErrors.billingZipCode = 'Billing zip code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const [completionPercentage, setCompletionPercentage] = useState(0);
  const [completionPercentage1, setCompletionPercentage1] = useState(0);
    // Calculate form completion percentage
    useEffect(() => {
      const calculateCompletion = () => {
        let filledFields = 0;
        let totalFields = 0;
  
        // Personal info fields
        if (step === 1) {
          totalFields = 8;
          filledFields += formData.personal.firstName ? 1 : 0;
          filledFields += formData.personal.lastName ? 1 : 0;
          filledFields += formData.personal.email ? 1 : 0;
          filledFields += formData.personal.phone ? 1 : 0;
          filledFields += formData.personal.address ? 1 : 0;
          filledFields += formData.personal.city ? 1 : 0;
          filledFields += formData.personal.country ? 1 : 0;
          filledFields += formData.personal.zipCode ? 1 : 0;

        const percentage = totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
        setCompletionPercentage(percentage);
        }
        // Payment method fields
        else if (step === 2) {
          if (formData.payment.method === 'card') {
            totalFields = 5;
            filledFields += formData.payment.method ? 1 : 0;
            filledFields += formData.payment.cardNumber ? 1 : 0;
            filledFields += formData.payment.cardName ? 1 : 0;
            filledFields += formData.payment.expiry ? 1 : 0;
            filledFields += formData.payment.cvv ? 1 : 0;
          } 
          else if (formData.payment.method === 'bank') {
            totalFields = 4;
            filledFields += formData.payment.method ? 1 : 0;
            filledFields += formData.payment.bankAccount ? 1 : 0;
            filledFields += formData.payment.bankRouting ? 1 : 0;
            filledFields += formData.payment.bankName ? 1 : 0;
          } 
          else {
            totalFields = 1;
            filledFields += formData.payment.method ? 1 : 0;
          }

        const percentage = totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
        setCompletionPercentage1(percentage);
        }
        // Billing info fields
        else if (step === 3) {
          if (!formData.billing.sameAsShipping) {
            totalFields = 5;
            filledFields += 1; // for the checkbox itself
            filledFields += formData.billing.address ? 1 : 0;
            filledFields += formData.billing.city ? 1 : 0;
            filledFields += formData.billing.country ? 1 : 0;
            filledFields += formData.billing.zipCode ? 1 : 0;
          } else {
            totalFields = 1;
            filledFields += 1; // checkbox is checked
          }
        }
  
        // const percentage = totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
        // setCompletionPercentage(percentage);
      };
  
      calculateCompletion();
    }, [formData, step]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
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

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

   const prevStep = () => {
    setStep(step - 1);
    // Set to 100% when going back to previous step (since it was completed)
    setCompletionPercentage(100);
  };

    useEffect(() =>{
        if (alldata && alldata.length > 0 && alldata[0]?.images[0]) {
            setMainImage(alldata[0]?.images[0])
        }
    }, [alldata]);

    const handleClick = (imageSrc) => {
        setMainImage(imageSrc)
    }

     if (paymentSuccess) {
    return (
      <div className="payment-success">
        <h2>Payment Successful!</h2>
        <div className="success-icon">✓</div>
        <p>Thank you for your payment. A confirmation has been sent to {formData.personal.email}.</p>
        <div className="receipt">
          <h3>Receipt</h3>
          <p><strong>Amount:</strong> $100.00</p>
          <p><strong>Payment Method:</strong> {formData.payment.method === 'card' ? 'Credit Card' : 'Bank Transfer'}</p>
          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        </div>
        <button onClick={() => {
          setPaymentSuccess(false);
          setStep(1);
          setCompletionPercentage(0);
        }}>Make Another Payment</button>
      </div>
    );
  }
   
    return <>
    <Head>
        <title>{slug}</title>
    </Head>
        
        <div className="shopslugpage">
           <section className="shopcontent"onMouseMove={handleMouseMove}
    >
      {/* Animated background glow */}
      <div 
        className="footer-glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      ></div>
           <div className="container">
           <div className="shopcontbox">


             <div className="leftshopimgbox">
           <div className="leftshopmainimg">
            {
                loading ? <Spinner /> :
                (
                    <>
                        <img src={mainImage} alt="title" />
                    </>
                )
            }
           
        </div>
        <div className="leftsimgboxlist">
            <Swiper
              slidesPerView={'auto'}
              loop={true}
              spaceBetween={30}
              freeMode={true}
              grabCursor={false}
              className="mySwiper"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              modules={[FreeMode, Autoplay]}
              
            >
                {
                    alldata && alldata[0]?.images.map((image, index) => (
                        <SwiperSlide key={index} className="bg-img" >
                            <img onClick={(e) => handleClick(image)} src={image} alt={image} />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
        </div>

        <div className="rightshopcontbox">
            <h1>{alldata && alldata[0]?.title}</h1>
            <h3 className="rightshopprice">Price: <span>{alldata && alldata[0]?.price}</span></h3>
                     <a target="_blank" className="shopnowbtn" href={alldata && alldata[0]?.afilink}>Purchase Now</a>
             <div className="blogcontent">
                 <h2 className="bctitle">Product Details:</h2>
                  <ReactMarkdown 
                                 rehypePlugins={[remarkGfm]}
                                 components={{
                                     code : ({
                     node, inline, className, children, ...props 
                   }) =>{
                     const match1 = /language-(\w+)/.exec(className ||'');
                     const match = /language-(\w+)/.exec(className || '')
                     console.log("match", match, className)
                     const [copied, setCopied] = useState(false);
                     const handleCopy = ()=>{
                         navigator.clipboard.writeText(children)
                         setCopied(true);
                        
                         setTimeout(() => {
                             setCopied(false)
                         }, 3000);
                     }
                 
                                         if (inline) {
                                             return <code style={{fontWeight:450,}}>{children}</code>
                                         } 
                 
                                         else if (!match) {
                                                return (
                                                 <div style={{position: 'relative',
                                                      fontWeight: 'normal'
                                                 }}>
                                                     <SyntaxHighlighter   style={a11yDark}
                   language="HTML"
                   PreTag='pre'
                   {...props}
                   codeTagProps={{
                     style:{
                         padding: '0',
                         marginLeft:'0',
                         borderRadius: '5px',
                         overflow: 'auto',
                         fontWeight:450,
                         whiteSpace:'pre-wrap'
                     }
                   }}
                   >
                 
                             {
                                 String(children).replace(/\n$/, '-').trim()
                             }
                 
                   </SyntaxHighlighter >
                                                       <button className="codebtn" onClick={handleCopy}  style={{
                                                         position:"absolute",
                                                         top: '0',
                                                         right: '0',
                                                         zIndex: '100',
                                                         padding:'.5rem',
                                                         fontWeight:450,
                                                        color: "#fff",
                                                         background:'#000'
                                                       }}>
                                                         {copied ? 'Copied!' : 'Copy Code '}
                                                       </button>
                                                 </div>
                                                )
                                         }
                                         else{
                                             return(
                                                 <code className="md-post-code" {...props}>
                                                     {children}
                                                 </code>
                                             )
                                         }
                 
                 }
                                 }}
                                 >
                 {alldata && alldata[0]?.description}
                                 </ReactMarkdown>
             </div>
            
        </div>

          
        </div>

         
        </div>
        </section>

        <section className="payment"onMouseMove={handleMouseMove}
    >
      {/* Animated background glow */}
      <div 
        className="footer-glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      ></div>
            <div className="container">
                 <h1>Secure Payment</h1>
                  <div className="progress-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Personal Info</div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{
              width: `${completionPercentage}%`,
              backgroundColor: 'var(--main-hover-color)'
              //`hsl(${completionPercentage1 * 1.2}, 100%, 50%)`
            }}
          ></div>
        </div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Payment</div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{
              width: `${completionPercentage1}%`,
              backgroundColor: 'var(--main-hover-color)'
              //`hsl(${completionPercentage1 * 1.2}, 100%, 50%)`
            }}
          ></div>
        </div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Billing</div>
      </div>

       {/* <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{
              width: `${completionPercentage}%`,
              backgroundColor: `hsl(${completionPercentage * 1.2}, 100%, 50%)`
            }}
          ></div>
        </div> */}

      <form className="leaveareplyform" style={{width:'100%'}}>
         {step === 1 && (
          <div className="form-step" style={{width:'100%'}}>
            <h2>Personal Information</h2>
             <div className="nameemailcomment">
                 <div className="form-group" >
              <label>First Name*</label>
              <input style={{width:'100%'}}
                type="text"
                name="personal.firstName"
                value={formData.personal.firstName}
                onChange={handleChange}
                placeholder="John"
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label>Last Name*</label>
              <input
                type="text"
                name="personal.lastName"
                value={formData.personal.lastName}
                onChange={handleChange}
                placeholder="Doe"
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
             </div>
           
              <div className="nameemailcomment">

            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                name="personal.email"
                value={formData.personal.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label>Phone*</label>
              <input
                type="tel"
                name="personal.phone"
                value={formData.personal.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

              </div>

            
            <div className="form-group">
              <label>Address*</label>
              <input
                type="text"
                name="personal.address"
                value={formData.personal.address}
                onChange={handleChange}
                placeholder="123 Main St"
              />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>City*</label>
                <input
                  type="text"
                  name="personal.city"
                  value={formData.personal.city}
                  onChange={handleChange}
                  placeholder="New York"
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
              
              <div className="form-group">
                <label>Country*</label>
                <select
                  name="personal.country"
                  value={formData.personal.country}
                  onChange={handleChange}
                >
                       {countryOptions.map(option => (
        <option key={option.value} value={option.value}>
            {option.label}
        </option>
    ))}
                </select>
                {errors.country && <span className="error">{errors.country}</span>}
              </div>
              
              <div className="form-group">
                <label>Zip Code*</label>
                <input
                  type="text"
                  name="personal.zipCode"
                  value={formData.personal.zipCode}
                  onChange={handleChange}
                  placeholder="10001"
                />
                {errors.zipCode && <span className="error">{errors.zipCode}</span>}
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={nextStep}>Next: Payment Method</button>
            </div>
          </div>
        )}
           {step === 2 && (
          <div className="form-step">
            <h2>Payment Method</h2>
            
            <div className="payment-methods">
              <label className={`payment-method ${formData.payment.method === 'card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment.method"
                  value="card"
                  checked={formData.payment.method === 'card'}
                  onChange={handleChange}
                />
                <div className="method-content">
                  <div className="method-icon">💳</div>
                  <span>Credit/Debit Card</span>
                </div>
              </label>
              
              <label className={`payment-method ${formData.payment.method === 'paypal' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment.method"
                  value="paypal"
                  checked={formData.payment.method === 'paypal'}
                  onChange={handleChange}
                />
                <div className="method-content">
                  <div className="method-icon">🔵</div>
                  <span>PayPal</span>
                </div>
              </label>
              
              <label className={`payment-method ${formData.payment.method === 'bank' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment.method"
                  value="bank"
                  checked={formData.payment.method === 'bank'}
                  onChange={handleChange}
                />
                <div className="method-content">
                  <div className="method-icon">🏦</div>
                  <span>Bank Transfer</span>
                </div>
              </label>
            </div>
            
            {errors.method && <span className="error">{errors.method}</span>}
            
            {formData.payment.method === 'card' && (
              <div className="card-details">
                <div className="nameemailcomment">
                    <div className="form-group">
                  <label>Card Number*</label>
                  <input
                    type="text"
                    name="payment.cardNumber"
                    value={formData.payment.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="16"
                  />
                  {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                </div>
                
                <div className="form-group">
                  <label>Name on Card*</label>
                  <input
                    type="text"
                    name="payment.cardName"
                    value={formData.payment.cardName}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                  {errors.cardName && <span className="error">{errors.cardName}</span>}
                </div>
                </div>
                
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date*</label>
                    <input
                      type="text"
                      name="payment.expiry"
                      value={formData.payment.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    {errors.expiry && <span className="error">{errors.expiry}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>CVV*</label>
                    <input
                      type="text"
                      name="payment.cvv"
                      value={formData.payment.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="4"
                    />
                    {errors.cvv && <span className="error">{errors.cvv}</span>}
                  </div>
                </div>
              </div>
            )}
            
            {formData.payment.method === 'bank' && (
              <div className="bank-details">
                <div className="form-group">
                  <label>Bank Name*</label>
                  <input
                    type="text"
                    name="payment.bankName"
                    value={formData.payment.bankName}
                    onChange={handleChange}
                    placeholder="Bank of America"
                  />
                  {errors.bankName && <span className="error">{errors.bankName}</span>}
                </div>
                
                <div className="form-group">
                  <label>Account Number*</label>
                  <input
                    type="text"
                    name="payment.bankAccount"
                    value={formData.payment.bankAccount}
                    onChange={handleChange}
                    placeholder="123456789"
                  />
                  {errors.bankAccount && <span className="error">{errors.bankAccount}</span>}
                </div>
                
                <div className="form-group">
                  <label>Routing Number*</label>
                  <input
                    type="text"
                    name="payment.bankRouting"
                    value={formData.payment.bankRouting}
                    onChange={handleChange}
                    placeholder="021000021"
                  />
                  {errors.bankRouting && <span className="error">{errors.bankRouting}</span>}
                </div>
              </div>
            )}
            
            {formData.payment.method === 'paypal' && (
              <div className="paypal-notice">
                <p>You will be redirected to PayPal to complete your payment after reviewing your order.</p>
              </div>
            )}
            
            <div className="form-actions">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={nextStep}>Next: Billing</button>
            </div>
          </div>
        )}

         {step === 3 && (
          <div className="form-step">
            <h2>Billing Information</h2>

                <div className="summary-section">
        <h3>Your Information</h3>
        <div className="summary-grid">
          <div>
            <h4>Personal Details</h4>
            <p><strong>Full Name:</strong> {formData.personal.firstName} {formData.personal.lastName}</p>
            <p><strong>Email:</strong> {formData.personal.email}</p>
            <p><strong>Phone:</strong> {formData.personal.phone}</p>
          </div>
          
          <div>
            <h4>Shipping Address</h4>
            <p><strong>Address:</strong>{formData.personal.address}</p>
            <p> <strong>City:</strong>{formData.personal.city}, {formData.personal.zipCode}</p>
            <p><strong>Country:</strong>{ countryOptions.filter(ab => ab.value == formData.personal.country).map(ab => (ab.label)) }</p>
          </div>
          
          <div>
            <h4>Payment Method</h4>
            <p>
                <strong>Method: </strong>
              {formData.payment.method === 'card' && 'Credit Card'}
              {formData.payment.method === 'paypal' && 'PayPal'}
              {formData.payment.method === 'bank' && 'Bank Transfer'}
            </p>
            {formData.payment.method === 'card' && (
              <p><strong>Card No: </strong> xxxx xxxx xxxx {formData.payment.cardNumber.slice(-4)}</p>
            )}
            <p><strong>Currency: </strong>{convertedAmount.symbol}</p>
          </div>
        </div>
      </div>
            
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="billing.sameAsShipping"
                  checked={formData.billing.sameAsShipping}
                  onChange={handleChange}
                />
                Billing address same as shipping
              </label>
            </div>
            
            {!formData.billing.sameAsShipping && (
              <div className="billing-address">
                <div className="form-group">
                  <label>Billing Address*</label>
                  <input
                    type="text"
                    name="billing.address"
                    value={formData.billing.address}
                    onChange={handleChange}
                    placeholder="123 Main St"
                  />
                  {errors.billingAddress && <span className="error">{errors.billingAddress}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Billing City*</label>
                    <input
                      type="text"
                      name="billing.city"
                      value={formData.billing.city}
                      onChange={handleChange}
                      placeholder="New York"
                    />
                    {errors.billingCity && <span className="error">{errors.billingCity}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Billing Country*</label>
                    <select
                      name="billing.country"
                      value={formData.billing.country}
                      onChange={handleChange}
                    >
                    <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="JP">Japan</option>
                <option value="IN">India</option>
                <option value="NG">Nigeria</option>
                <option value="BR">Brazil</option>
                <option value="ZA">South Africa</option>
                    </select>
                    {errors.billingCountry && <span className="error">{errors.billingCountry}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Billing Zip Code*</label>
                    <input
                      type="text"
                      name="billing.zipCode"
                      value={formData.billing.zipCode}
                      onChange={handleChange}
                      placeholder="10001"
                    />
                    {errors.billingZipCode && <span className="error">{errors.billingZipCode}</span>}
                  </div>
                </div>
              </div>
            )}
            
          <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-item">
          <span>Subtotal:</span>
          <span>$100.00 USD</span>
        </div>
        <div className="summary-item">
          <span>Shipping:</span>
          <span>$0.00 USD</span>
        </div>
        <div className="summary-item total">
          <span>Total:</span>
          <span>
            {convertedAmount.symbol}{convertedAmount.amount} {convertedAmount.code}
            <br />
            <small>(≈ {alldata && alldata[0]?.price} USD)</small>
          </span>
        </div>
        
        <div className="currency-note">
          <p>
            Amount converted to {convertedAmount.code} using current exchange rates.
            <br />
            Your bank may charge additional conversion fees.
          </p>
        </div>
      </div>
            
            <div className="form-actions">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="submit" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Complete Payment'}
              </button>
            </div>
          </div>
        )}
      </form>
            </div>
         </section>
       
        </div>

    </>
}