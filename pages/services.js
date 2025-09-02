import ProgressBar from "@/components/ProgressBar";
import Head from "next/head";
import Link from "next/link";
import { IoCheckmarkDone, IoChevronDown, IoStar, IoStarOutline } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useRef, useState } from "react";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const SERVICES = [
  {
    id: 1,
    title: 'Website Development',
    icon: '/img/website_icon.svg',
    description: 'I am very good in web development offering services. I am great at building high-performance, scalable web applications that deliver exceptional user experiences. My expertise includes modern frameworks like React, Next.js, and Node.js, ensuring your website is fast, secure, and SEO-optimized.',
    highlights: [
      "Full-stack development",
      "RESTful API integration",
      "Database design",
      "Performance optimization",
      "Robust Security"
    ],
    category: 'Website Development'
  },
  {
    id: 2,
    title: 'Mobile Development',
    icon: '/img/mobile_logo.svg',
    description: 'Experienced mobile developer offering Native-quality mobile apps that delight users and drive engagement. Built with React Native for cross-platform excellence.',
    highlights: [
      'UI/UX Design',
      'iOS & Android deployment',
      'Offline-first architecture',
      'Biometric authentication',
      'App Store optimization'
    ],
    category: 'Mobile Development'
  },
   {
    id: 3,
    title: 'Graphic & UI/UX Design',
    icon: '/img/UI.png', // You might want to use a combined icon
    description: 'Comprehensive design solutions that bridge visual identity and digital experience. From brand aesthetics to intuitive interfaces, we create designs that captivate and convert.',
    highlights: [
      'Logo & brand identity design',
      'User interface design',
      'User experience optimization',
      'Marketing collateral',
      'Interactive prototypes',
      'Design system creation'
    ],
    category: 'Graphic & UI/UX Design' // Combined category
  },
  {
    id: 5,
    title: 'Network Administration',
    icon: '/img/networking.svg',
    description: 'Experienced network engineer offering reliable and secure network infrastructure solutions that keep your business connected and protected.',
    highlights: [
      'Network Design',
      'Network setup & configuration',
      'Security implementation',
      'Performance monitoring',
      'Troubleshooting'
    ],
    category: 'Network Design'
  },
  {
    id: 6,
    title: 'Content Creator',
    icon: '/img/video_editing.svg',
    description: 'I am very good at professional video production services that tell your story with impact and cinematic quality.',
    highlights: [
      '4K video editing',
      'Motion graphics',
      'Color grading',
      'Sound design',

    ],
    category: 'Video Editing'
  }
];



const PRICING_PLANS = {
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
    cta: 'Launch My Project'
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
    cta: 'Get Bespoke Quote'
  }
};

export default function Services() {
  const { alldata } = useFetchData('/api/reviews');
  const [loading, setLoading] = useState(true);
  const [ReviewAllData, setReviewAllData] = useState([]);
  const contRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [currP, setCurrP] = useState(1);
  const [pagePage] = useState(2);
  const [selectedPlan, setSelectedPlan] = useState('Monthly');
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [ActiveLink, setActiveLink] = useState('');
 
const router = useRouter();

      useEffect(() => {
    const {pathname} = router
     const url = new URL(window.location.href);
    const fragment = url.hash.substring(1);
    if (fragment) {
       setActiveLink(fragment)
    }
    else{
      setActiveLink(fragment)
    }
   // setActiveLink(router.pathname)
       
     }, [ActiveLink, router.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewResponse = await fetch('/api/project');
        const Data = await reviewResponse.json();
        setReviewAllData(Data.filter((ab) => ab.status === 'publish'));
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % alldata.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [index]);

  const handleMouseMove = (e) => {
    setGlowPosition({ x: e.clientX, y: e.clientY });
  };

  const extractFirstParagraph = (markdown) => {
    const paragraphs = markdown.split('\n\n');
    return paragraphs[0].length > 250 ? `${paragraphs[0].slice(0, 250)}` : paragraphs[0];
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="starRating">
        {[...Array(5)].map((_, i) => 
          i < rating ? <IoStar key={i} /> : <IoStarOutline key={i} />
        )}
      </div>
    );
  };

  const formatDate = (date) => {
    if (!date || isNaN(date)) return '';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: true
    }).format(date);
  };

  const calculateRatings = (reviews) => {
    const ratings = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    };
    
    reviews.forEach(review => {
      const rating = review?.rating?.length || 0;
      if (rating >= 1 && rating <= 5) {
        ratings[rating]++;
      }
    });
    
    const total = reviews.length || 1;
    return {
      1: (ratings[1] / total) * 100,
      2: (ratings[2] / total) * 100,
      3: (ratings[3] / total) * 100,
      4: (ratings[4] / total) * 100,
      5: (ratings[5] / total) * 100,
      total: reviews.length
    };
  };

  const getServiceReviews = (category) => {
    const projects = ReviewAllData.filter(ab => ab.projectcategory === category);
    const reviews = projects.flatMap(project => project.review || []);
    return calculateRatings(reviews);
  };

  const pageNum = [];
  const allproject = alldata.length;
  const indexfirstString = (currP - 1) * pagePage;
  const indexlastString = currP * pagePage;
  const curreproject = alldata.slice(indexfirstString, indexlastString);
  
  for (let i = 1; i <= Math.floor(allproject/pagePage); i++) {
    pageNum.push(i);
  }
  const [CurrentNum, setCurrentNum] = useState(5);
  const [image, setImage] = useState(`https://picsum.photos/1920/1080?random=330`)
  useEffect(() => {
        const interval =  setInterval(() => {
              setCurrentNum((pre) => (pre + 1) % 330); 
              setImage(`https://picsum.photos/1920/1080?random=${CurrentNum}`) 
  }, 2 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [])
  const paginate = (pageNum) => setCurrP(pageNum);

  return (
    <>
      <Head>
        <title>MYG Tech - Services</title>
      </Head>

      <div className="servicespage">
        <section 
        className="sp__hero" 
        onMouseMove={handleMouseMove}
        style={{
          background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${image})`,
        }}
        data-aos="fade"
      >
        <div 
          className="footer-glow"
          style={{ left: `${glowPosition.x}px`, top: `${glowPosition.y}px` }}
        ></div>
        
        <div className="sp__hero-content">
          <h1 className="sp__hero-title" data-aos="fade-up" data-aos-delay="100">
            <span 
              className="sp__hero-title-line" 
              style={{color: '#ffffff'}}
              data-aos="fade-right"
              data-aos-delay="150"
            >
              My Service
            </span>
            <span 
              className="sp__hero-title-line sp__hero-title-line--highlight"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              Masterpieces
            </span>
          </h1>
          
          <p 
            className="sp__hero-subtitle" 
            style={{color: '#ffffff'}}
            data-aos="fade-up"
            data-aos-delay="250"
          >
            Premium development services for visionary businesses, organization or individuals. 
            We transform ideas into high-performance digital experiences that drive results.
          </p>
          
          <div 
            className="sp__hero-scroll-hint" 
            onClick={() => contRef.current.scrollIntoView({ behavior: 'smooth' })}
            style={{
              top: '100%', 
              left: '40%', 
              transform: 'translateY(-50%) translateX(-50%)',
              display:'flex', 
              flexDirection:'column', 
              alignItems:'center'
            }}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <span style={{color: '#ffffff'}}>Explore</span>
            <div className="sp__hero-scroll-arrow" style={{color: '#ffffff'}}>
              <IoChevronDown />
            </div>
          </div>
        </div>
      </section>

       {/* Services Section */}
      <div 
        className="centerservices" 
        ref={contRef} 
        onMouseMove={handleMouseMove}
        data-aos="fade-up"
      >
        <div className="footer-glow" style={{ left: `${glowPosition.x}px`, top: `${glowPosition.y}px` }}></div>
        
        <div className="container">
          <div className="sp__section-header">
            <h2 className="sp__section-title" data-aos="fade-up">
              <span className="sp__section-title-pre">Our</span>
              Signature Services
            </h2>
            <p 
              className="sp__section-intro"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Our meticulously crafted services deliver transformative results,
              empowering businesses, organizations, and visionaries to achieve unparalleled success.
            </p>
          </div>
          
          <div className="cservicesbox">
            {SERVICES.map((service, index) => {
              const ratings = getServiceReviews(service.category);
              return (
                <div 
                  className={`csservice ${ActiveLink === service.title.replace(' ', '-') ? 'active' : ''}`} 
                  key={service.id} 
                  id={`${service.title.replace(' ', '-')}`}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <span>{service.id.toString().padStart(2, '0')}</span>
                  <div>
                    <h2>{service.title}</h2>
                    <div className="w-100 flex gap-1 subserv">
                      <img src={service.icon} alt={service.title} />
                      <div className="w-100">
                        <p style={{textAlign: 'center'}}>
                          Rating({ratings.total > 999 ? `${ratings.total/1000}K` : 
                                ratings.total > 9 ? ratings.total : `0${ratings.total}`})
                        </p>
                        {[5, 4, 3, 2, 1].map(rating => (
                          <div className="flex gap-1" key={rating}>
                            <p>{rating}</p>
                            <ProgressBar value={ratings[rating]} max={100} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p>{service.description}</p>
                  <ul>
                    {service.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                  <a 
                    href={`/projects/category/${service.category}`} 
                    className="sp__service-cta"
                    data-aos="fade-up"
                    data-aos-delay={index * 100 + 50}
                  >
                    Explore {service.title} Projects
                    <p className="sp__service-cta-arrow">→</p>
                  </a>
                  <div className="sp__service-card-bg"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

       
 <section 
        className="services-page__testimonials" 
        onMouseMove={handleMouseMove}
        data-aos="fade-up"
      >
        <div className="footer-glow" style={{ left: `${glowPosition.x}px`, top: `${glowPosition.y}px` }}></div>
        
        <div className="sp__section-header">
          <span 
            className="sp__section-title-pre"
            data-aos="fade-right"
          >
            Our
          </span>
          <h2 
            className="sp__section-title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Client Acclaim
          </h2>
          <p 
            className="sp__section-intro"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Don't take our word for it - hear from industry leaders who've experienced 
            our transformative work.
          </p>
        </div>

        {curreproject.length === 0 && (
          <h1 
            className="w-100 flex flex-center mt-3"
            data-aos="fade-up"
          >
            No Testimonials Found
          </h1>
        )}

        <div className="flex gap-2" style={{alignItems: 'center'}}>
          {curreproject.map((test, index) => (
            <div 
              className="services-page__testimonial" 
              key={test.id}
              data-aos="flip-up"
              data-aos-delay={index * 100}
            >
              <p className="services-page__testimonial-text">
                {extractFirstParagraph(test.message)}
              </p>
              <div className="services-page__testimonial-author">
                <img 
                  src={test.image} 
                  alt={test.name}
                  className="services-page__testimonial-avatar"
                />
                <div className="services-page__testimonial-info">
                  <h4 className="services-page__testimonial-name">{test.name}</h4>
                  <p className="services-page__testimonial-role">
                    {test.role}, <a>{test.company || 'Tech Sul Limitted.inc'}</a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {curreproject.length > 0 && (
          <div 
            className="blogspaginationbtn flex" 
            style={{display: 'flex', justifyContent: 'center'}}
            data-aos="fade-up"
          >
            {pageNum.slice(Math.max(currP - 3, 0), Math.min(currP + 2, pageNum.length)).map(num => (
              <button 
                key={num} 
                onClick={() => paginate(num)}
                className={`${currP === num ? 'active' : ''}`}
              >
                
              </button>
            ))}
          </div>
        )}
      </section>

       <section 
        className="sp__pricing" 
        onMouseMove={handleMouseMove}
        data-aos="fade-up"
      >
        <div className="footer-glow" style={{ left: `${glowPosition.x}px`, top: `${glowPosition.y}px` }}></div>
        
        <div className="sp__section-header">
          <h2 
            className="sp__section-title"
            data-aos="fade-up"
          >
            <span className="sp__section-title-pre">Support</span>
            My Mission
          </h2>
          <p 
            className="sp__section-intro"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Every donation fuels my ability to deliver exceptional services and create meaningful digital solutions. 
            Your support enables me to keep innovating and helping more clients transform their visions into reality.
          </p>
        </div>

        <div 
          className="sp__pricing-toggle"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {['One-Time', 'Monthly', 'Project-Specific'].map((type, index) => (
            <button
              key={type}
              className={`sp__pricing-toggle-option ${selectedPlan === type ? 'sp__pricing-toggle-option--active' : ''}`}
              onClick={() => setSelectedPlan(type)}
              data-aos="zoom-in"
              data-aos-delay={index * 50 + 200}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="sp__pricing-cards">
          {[
            {
              name: 'Supporter',
              price: '$50',
              period: 'one-time',
              features: [
                'My heartfelt gratitude',
                'Priority response to your inquiries',
                'Exclusive project updates',
                'Digital thank-you certificate'
              ],
              cta: 'Become a Supporter',
              popular: false
            },
            {
              name: 'Patron',
              price: '$200',
              period: 'one-time',
              features: [
                'All Supporter benefits',
                '30-minute consultation session',
                'Early access to new tools I develop',
                'Name listed on supporters page'
              ],
              cta: 'Become a Patron',
              popular: true
            },
            {
              name: 'Visionary',
              price: 'Custom',
              period: 'investment',
              features: [
                'All Patron benefits',
                'Personalized thank-you video',
                'Quarterly impact reports',
                'Opportunity to sponsor specific projects'
              ],
              cta: 'Discuss Partnership',
              popular: false
            }
          ].map((plan, index) => (
            <div
              className={`sp__pricing-card ${plan.popular ? 'sp__pricing-card--featured sp__pricing-card--active' : ''}`}
              key={plan.name}
              data-aos="flip-up"
              data-aos-delay={index * 100 + 250}
            >
              {plan.popular && (
                <div 
                  className="sp__pricing-card-badge"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100 + 350}
                >
                  Most Impactful
                </div>
              )}
              <h3 className="sp__pricing-card-title">{plan.name}</h3>
              <div className="sp__pricing-card-price">
                {plan.price}
                <span className="sp__pricing-card-period">/{plan.period}</span>
              </div>
              <ul className="sp__pricing-card-features">
                {plan.features.map((feature, i) => (
                  <li 
                    className="sp__pricing-card-feature" 
                    key={i}
                    data-aos="fade-up"
                    data-aos-delay={i * 50 + index * 100 + 300}
                  >
                    <span className="sp__pricing-card-feature-icon">❤️</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                className="sp__pricing-card-cta"
                onClick={() => {
                  window.gtag('event', 'begin_checkout', {
                    items: [{
                      item_name: `${plan.name} Donation`,
                      price: plan.price.replace('$', ''),
                      quantity: 1
                    }]
                  });
                  window.location.href = `/donate?amount=${plan.price.replace('$', '')}&tier=${plan.name}`;
                }}
                data-aos="zoom-in"
                data-aos-delay={index * 100 + 400}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div 
          className="sp__section-header mt-2" 
          style={{marginTop:'1rem'}}
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <p className="sp__section-intro">
            <strong style={{textDecoration: 'underline'}}>Your support makes a difference:</strong> Every contribution helps me maintain cutting-edge tools, 
            continue professional development, and dedicate more time to pro-bono work for worthy causes. 
            Together, we can build a better digital future.
          </p>
        </div>
      </section>


      </div>
    </>
  );
}