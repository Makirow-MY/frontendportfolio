import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AsYouType, isValidNumber } from 'libphonenumber-js';



import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
//import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
//import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import axios from "axios";
import { useCart } from "@/components/Context";
import { FaForward } from "react-icons/fa";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";


export default function shopslug() {
 const router = useRouter();
    const slug = 'lord  jesus';
    const {alldata, loading} = useFetchData(`/api/shops?slug=${slug}`)
     const [step, setStep] = useState(1);
         const [completionPercentage, setCompletionPercentage] = useState(0);
  const [completionPercentage1, setCompletionPercentage1] = useState(0);

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
           method: 'card',
           cardNumber: '',
           cardName: '',
           expiry: '',
           cvv: '',
           bankAccount: '',
           bankRouting: '',
           bankName: ''
         },
       
       });
       const [errors, setErrors] = useState({});
        const inputRef = useRef(null);
       const [isProcessing, setIsProcessing] = useState(false);
       const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [mainImage, setMainImage] = useState('');
  // Currency conversion rates (simplified - in a real app, use an API)
const currencyRates = {
    AE: { code: 'AED', symbol: 'د.إ', rate: 3.67 },   // UAE
    AR: { code: 'ARS', symbol: '$', rate: 817.53 },   // Argentina
    AT: { code: 'EUR', symbol: '€', rate: 0.93 },     // Austria
    AU: { code: 'AUD', symbol: 'A$', rate: 1.51 },    // Australia
    BE: { code: 'EUR', symbol: '€', rate: 0.93 },     // Belgium
    BR: { code: 'BRL', symbol: 'R$', rate: 5.05 },    // Brazil
    CA: { code: 'CAD', symbol: 'CA$', rate: 1.35 },   // Canada
    CH: { code: 'CHF', symbol: 'CHF', rate: 0.91 },   // Switzerland
    CL: { code: 'CLP', symbol: 'CLP$', rate: 937.50 }, // Chile
    CM: { code: 'XAF', symbol: 'FCFA', rate: 608.25 }, // Cameroon
    CN: { code: 'CNY', symbol: '¥', rate: 7.24 },     // China
    CO: { code: 'COP', symbol: 'COL$', rate: 3912.50 }, // Colombia
    CZ: { code: 'CZK', symbol: 'Kč', rate: 23.45 },   // Czech Republic
    DE: { code: 'EUR', symbol: '€', rate: 0.93 },     // Germany
    DK: { code: 'DKK', symbol: 'kr', rate: 6.93 },    // Denmark
    EG: { code: 'EGP', symbol: 'E£', rate: 30.90 },   // Egypt
    ES: { code: 'EUR', symbol: '€', rate: 0.93 },     // Spain
    FI: { code: 'EUR', symbol: '€', rate: 0.93 },     // Finland
    FR: { code: 'EUR', symbol: '€', rate: 0.93 },     // France
    GB: { code: 'GBP', symbol: '£', rate: 0.79 },     // United Kingdom
    GH: { code: 'GHS', symbol: 'GH₵', rate: 12.50 },  // Ghana
    GR: { code: 'EUR', symbol: '€', rate: 0.93 },     // Greece
    HK: { code: 'HKD', symbol: 'HK$', rate: 7.83 },   // Hong Kong
    HU: { code: 'HUF', symbol: 'Ft', rate: 365.25 },  // Hungary
    ID: { code: 'IDR', symbol: 'Rp', rate: 15887.50 }, // Indonesia
    IE: { code: 'EUR', symbol: '€', rate: 0.93 },     // Ireland
    IL: { code: 'ILS', symbol: '₪', rate: 3.73 },     // Israel
    IN: { code: 'INR', symbol: '₹', rate: 83.32 },    // India
    IT: { code: 'EUR', symbol: '€', rate: 0.93 },     // Italy
    JP: { code: 'JPY', symbol: '¥', rate: 151.61 },   // Japan
    KE: { code: 'KES', symbol: 'KSh', rate: 157.50 }, // Kenya
    KR: { code: 'KRW', symbol: '₩', rate: 1351.27 },  // South Korea
    KW: { code: 'KWD', symbol: 'KD', rate: 0.31 },    // Kuwait
    MX: { code: 'MXN', symbol: 'MX$', rate: 16.89 },  // Mexico
    MY: { code: 'MYR', symbol: 'RM', rate: 4.74 },    // Malaysia
    NG: { code: 'NGN', symbol: '₦', rate: 1505.50 },  // Nigeria
    NL: { code: 'EUR', symbol: '€', rate: 0.93 },     // Netherlands
    NO: { code: 'NOK', symbol: 'kr', rate: 10.75 },   // Norway
    NZ: { code: 'NZD', symbol: 'NZ$', rate: 1.66 },   // New Zealand
    PE: { code: 'PEN', symbol: 'S/', rate: 3.72 },    // Peru
    PH: { code: 'PHP', symbol: '₱', rate: 56.45 },    // Philippines
    PK: { code: 'PKR', symbol: '₨', rate: 278.50 },   // Pakistan
    PL: { code: 'PLN', symbol: 'zł', rate: 4.15 },    // Poland
    PT: { code: 'EUR', symbol: '€', rate: 0.93 },     // Portugal
    QA: { code: 'QAR', symbol: 'QR', rate: 3.64 },    // Qatar
    RO: { code: 'RON', symbol: 'lei', rate: 4.62 },   // Romania
    RU: { code: 'RUB', symbol: '₽', rate: 91.45 },    // Russia
    SA: { code: 'SAR', symbol: 'SR', rate: 3.75 },    // Saudi Arabia
    SE: { code: 'SEK', symbol: 'kr', rate: 10.45 },   // Sweden
    SG: { code: 'SGD', symbol: 'S$', rate: 1.35 },    // Singapore
    TH: { code: 'THB', symbol: '฿', rate: 36.55 },    // Thailand
    TR: { code: 'TRY', symbol: '₺', rate: 32.04 },    // Turkey
    TW: { code: 'TWD', symbol: 'NT$', rate: 31.45 },  // Taiwan
    UA: { code: 'UAH', symbol: '₴', rate: 36.57 },    // Ukraine
    US: { code: 'USD', symbol: '$', rate: 1 },        // United States
    VE: { code: 'VES', symbol: 'Bs.S', rate: 36.23 }, // Venezuela
    VN: { code: 'VND', symbol: '₫', rate: 24785.00 }, // Vietnam
    ZA: { code: 'ZAR', symbol: 'R', rate: 18.91 }     // South Africa
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

const [DataFromStorage, setDataFromStorage] = useState([]);
  
const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
   const handleMouseMove = (e) => {
    setGlowPosition({
      x: e.clientX,
      y: e.clientY
    });
  };
  // Calculate converted amount



    // Save form data to localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('PaymentInfo', JSON.stringify(formData));
    }
  }, [formData]);

 
     useEffect(() => {  
       const savedPaymentInfo = window.localStorage.getItem('PaymentInfo');
      const savedCart = window.localStorage.getItem('cart');   
      console.log("savedPaymentInfo", JSON.parse(savedPaymentInfo), "savedCart", JSON.parse(savedCart)) 
      if (savedPaymentInfo && savedCart) {
        setFormData(JSON.parse(savedPaymentInfo));
      }
           
    }, []);

      // Initialize state from localStorage (client-side only)
  useEffect(() => {
 
      const savedPaymentInfo = window.localStorage.getItem('PaymentInfo');
      const savedCart = window.localStorage.getItem('cart');

      if (JSON.parse(savedPaymentInfo) && JSON.parse(savedPaymentInfo).length > 0 && savedPaymentInfo) {
        setFormData(JSON.parse(savedPaymentInfo));
      }

      if ( JSON.parse(savedCart) && JSON.parse(savedCart).length > 0 && savedCart) {
        setDataFromStorage(JSON.parse(savedCart));
         console.log("JSON.parse(savedCart)0iii",JSON.parse(savedCart))
      } 
      else{
        console.log("JSON.parse(savedCart)oooooooooo",JSON.parse(savedCart))
        router.push('/projects');
         window.localStorage.removeItem('PaymentInfo');
        
      }
    
  }, []);

    useEffect(() => {
 
      const savedPaymentInfo = window.localStorage.getItem('PaymentInfo');

      
         window.localStorage.setItem('PaymentInfo', JSON.stringify(formData));

  }, [formData]);

  const calculateConvertedAmount = () => {
    const baseAmount = DataFromStorage.reduce((sum, item) => sum + item.price, 0); // $100.00 USD base amount
    const countryCode = formData.personal.country;
    
    const currency = currencyRates[countryCode] || currencyRates['US'];
    const convertedAmount = baseAmount * currency.rate;
    
    return {
      amount: convertedAmount.toFixed(2),
      symbol: currency.symbol,
      code: currency.code
    };
  };
  const convertedAmount = calculateConvertedAmount()

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
      if (!formData.personal.address) newErrors.address = 'Address is required';
      if (!formData.personal.city) newErrors.city = 'City is required';
      if (!formData.personal.country) newErrors.country = 'Country is required';
      if (!formData.personal.zipCode) newErrors.zipCode = 'Zip code is required';
    }
    
    if (step === 2) {
      if (!formData.payment.method) newErrors.method = 'Payment method is required';
      
      if (formData.payment.method === 'card') {
        if (!formData.payment.cardNumber) newErrors.cardNumber = 'Card number is required';
        else if (formData.payment.cardNumber.length < 19){
          console.log("!/^\d{19}$/.test(formData.payment.cardNumber)", /^\d{19}$/.test(formData.payment.cardNumber))
          newErrors.cardNumber = 'Card number must be 16 digits';}
        
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
    setTimeout(() => {
      setErrors({})
    }, 3000);
    return Object.keys(newErrors).length === 0;
  };

 
   
  // Initialize state from localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPaymentInfo = window.localStorage.getItem('PaymentInfo');
      const savedCart = window.localStorage.getItem('cart');

      if (savedPaymentInfo) {
        setFormData(JSON.parse(savedPaymentInfo));
      }

      if (savedCart) {
        setDataFromStorage(JSON.parse(savedCart));
      } else {
        window.localStorage.removeItem('PaymentInfo');
        router.push('/projects');
      }
    }
  }, []);

  // Function to extract country code from phone number
const extractCountryCode = (phoneNumber) => {
    if (!phoneNumber) return null;
    
    // Find the longest matching country code (to handle cases like +1 and +123)
    const matchedCountries = countryOptions
        .filter(option => option.phoneCode && phoneNumber.startsWith(option.phoneCode))
        .sort((a, b) => b.phoneCode.length - a.phoneCode.length);
    
    return matchedCountries.length > 0 ? matchedCountries[0] : null;
};

// Function to validate phone number based on country
// const validatePhoneNumber = (phoneNumber, countryCode) => {
//     if (!phoneNumber || !countryCode) return false;
    
//     // Remove country code for validation
//     const numberWithoutCode = phoneNumber.replace(countryCode, '').trim();
    
//     // Basic validation - adjust this based on your requirements
//     if (numberWithoutCode.length < 5 || numberWithoutCode.length > 15) {
//         return false;
//     }
    
//     // Check if the remaining number contains only digits and optional spaces
//     return /^[\d\s]+$/.test(numberWithoutCode);
// };
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

            totalFields = 1;
            filledFields += 1; // checkbox is checked
         
        }
  
        // const percentage = totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
        // setCompletionPercentage(percentage);
      };
  
      calculateCompletion();
    }, [formData, step]);
// Handle phone number input changes
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



// Handle other form field changes (original handleChange)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Special handling for card number formatting
        if (name === 'payment.cardNumber') {
            // Remove all non-digit characters
            const digitsOnly = value.replace(/\D/g, '');
            
            // Add space after every 4 digits (max 16 digits)
            let formattedValue = '';
            for (let i = 0; i < digitsOnly.length; i++) {
                if (i > 0 && i % 4 === 0 && i < 16) {
                    formattedValue += ' ';
                }
                if (i < 16) { // Limit to 16 digits
                    formattedValue += digitsOnly[i];
                }
            }
            
            // Update form data with formatted value
            setFormData(prev => ({
                ...prev,
                payment: {
                    ...prev.payment,
                    cardNumber: formattedValue
                }
            }));
            return;
        }

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
console.log("itle", DataFromStorage)
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
        <title>MYG Tech - Checkout</title>
    </Head>
        
      

       <section 
  className="payment" 
  onMouseMove={handleMouseMove}
  data-aos="fade"
>
  {/* Animated background glow */}
  <div 
    className="footer-glow nice-glow"
    style={{
      left: `${glowPosition.x}px`,
      top: `${glowPosition.y}px`,
    }}
  ></div>
  
  <div className="container">
    <h1 data-aos="fade-down">CHECKOUT</h1>
    
    {/* Progress Steps */}
    <div 
      className="progress-steps"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div 
        className={`step ${step >= 1 ? 'active' : ''}`}
        data-aos="zoom-in"
        data-aos-delay="150"
      >
        1. Personal Info
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{
            width: `${completionPercentage}%`,
            backgroundColor: 'var(--main-hover-color)'
          }}
        ></div>
      </div>
      <div 
        className={`step ${step >= 2 ? 'active' : ''}`}
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        2. Payment
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{
            width: `${completionPercentage1}%`,
            backgroundColor: 'var(--main-hover-color)'
          }}
        ></div>
      </div>
      <div 
        className={`step ${step >= 3 ? 'active' : ''}`}
        data-aos="zoom-in"
        data-aos-delay="250"
      >
        3. Billing
      </div>
    </div>

    <form className="leaveareplyform" style={{width:'100%'}}>
      {/* Step 1: Personal Information */}
      {step === 1 && (
        <div 
          className="form-step" 
          style={{width:'100%'}}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 data-aos="fade-right">Personal Information</h2>
          
          <div 
            className="nameemailcomment"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            <div className="form-group">
              <label>First Name*</label>
              <input 
                style={{width:'100%'}}
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
          
          <div 
            className="nameemailcomment"
            data-aos="fade-up"
            data-aos-delay="300"
          >
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
                onChange={handlePhoneChange}
                placeholder="+12345678900"
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>

          <div 
            className="form-group"
            data-aos="fade-up"
            data-aos-delay="350"
          >
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
          
          <div 
            className="form-row"
            data-aos="fade-up"
            data-aos-delay="400"
          >
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
          
          <div 
            className="form-actions"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <button type="button" onClick={nextStep}>Next: Payment Method</button>
          </div>
        </div>
      )}

      {/* Step 2: Payment Method */}
      {step === 2 && (
        <div 
          className="form-step"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 data-aos="fade-right">Payment Method</h2>
          
          <div 
            className="payment-methods"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            <label 
              className={`payment-method ${formData.payment.method === 'card' ? 'selected' : ''}`}
              data-aos="zoom-in"
              data-aos-delay="300"
            >
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
            
            <label 
              className={`payment-method ${formData.payment.method === 'paypal' ? 'selected' : ''}`}
              data-aos="zoom-in"
              data-aos-delay="350"
            >
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
            
            <label 
              className={`payment-method ${formData.payment.method === 'bank' ? 'selected' : ''}`}
              data-aos="zoom-in"
              data-aos-delay="400"
            >
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
            <div 
              className="card-details"
              data-aos="fade-up"
              data-aos-delay="450"
            >
              <div 
                className="nameemailcomment"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className="form-group">
                  <label>Card Number*</label>
                  <input
                    type="text"
                    name="payment.cardNumber"
                    value={formData.payment.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 XXXX XXXX 1234"
                    maxLength={19}
                    pattern="\d{4} \d{4} \d{4} \d{4}"
                    inputMode="numeric"
                    style={{ letterSpacing: '1px' }}
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
              
              <div 
                className="form-row"
                data-aos="fade-up"
                data-aos-delay="550"
              >
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
            <div 
              className="bank-details"
              data-aos="fade-up"
              data-aos-delay="450"
            >
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
            <div 
              className="paypal-notice"
              data-aos="fade-up"
              data-aos-delay="450"
            >
              <p>You will be redirected to PayPal to complete your payment after reviewing your order.</p>
            </div>
          )}
          
          <div 
            className="form-actions"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next: Billing</button>
          </div>
        </div>
      )}

      {/* Step 3: Billing Information */}
      {step === 3 && (
        <div 
          className="form-step"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 data-aos="fade-right">Billing Information</h2>

          <div 
            className="summary-section"
            data-aos="fade-up"
            data-aos-delay="250"
          >
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
                <p><strong>Currency: </strong>{convertedAmount.symbol}, {convertedAmount.code}</p>
              </div>
            </div>
          </div>

          <div 
            className="summary-section"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3>Checkout Product{DataFromStorage.length > 1 ? 's' : null}</h3>
            <div className="summary-grid">
              {DataFromStorage.map((items, index) => (
                <div 
                  className="summcard"
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={350 + (index * 50)}
                >
                  <img src={items.images[0]} alt={items.title}/>
                  <span>${items.price}</span>
                  <p><strong>{items.title}</strong> </p>
                </div>
              ))}
            </div>
          </div>
          
          <div 
            className="order-summary"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>${DataFromStorage.reduce((sum, item) => sum + item.price, 0)}</span>
            </div>
            <div className="summary-item">
              <span>Currency symbol</span>
              <span>{convertedAmount.symbol}, {convertedAmount.code}</span>
            </div>
            <div className="currency-note">
              <p>
                Amount converted to the currency of your country ({ countryOptions.filter(ab => ab.value == formData.personal.country).map(ab => (ab.label)) }, {convertedAmount.code}) using current exchange rates.
              </p>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>
                {convertedAmount.amount}  {convertedAmount.code}
                <br />
                <small>(≈ {DataFromStorage.reduce((sum, item) => sum + item.price, 0)} USD)</small>
              </span>
            </div>
          </div>
          
          <div 
            className="form-actions"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <button type="button" onClick={prevStep}>Back</button>
            <button type="submit" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Complete Payment'}
            </button>
          </div>
        </div>
      )}
    </form>

    <a 
      href="/projects"
      title="view cart"
      className="back-to-top cart"
      aria-label="Back to top"
      style={{width: 'normal', borderRadius: '10px', left: '4rem', top: '6rem'}}
      data-aos="fade-right"
      data-aos-delay="500"
    >
      <IoArrowBack size={20} />
    </a>
  </div>
</section>

    </>
}