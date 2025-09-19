import Spinner from "@/components/Spinner";
import TruncatedParagraph from "@/components/TruncateParagraph";
import useFetchData from "@/hooks/useFetchData";
import { color } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { FaCartShopping, FaCheckDouble, FaChevronLeft, FaChevronRight, FaEyeSlash, FaFlask, FaLock } from "react-icons/fa6";
import { IoArrowBack, IoArrowForward, IoCart, IoCartOutline, IoChevronBack, IoChevronDown, IoChevronForward, IoMenuOutline, IoStar, IoStarOutline, IoTrash } from "react-icons/io5";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function shop() {
      const [refresh, setRefresh] = useState(false);
      const {alldata, loading} = useFetchData('/api/project');
      const pulishedData = alldata.filter(ab => ab.status === 'publish')
 const pulishedWebData = alldata.filter(ab => ab.status === 'publish'  && ab.projectcategory === 'Website Development')
const pulishedMobData = alldata.filter(ab => ab.status === 'publish'  && ab.projectcategory === 'Mobile Development')

   
      const [cartShow, setcartShow] = useState(false);
       const [Index, setIndex] = useState(0)
     const [activeCategory, setActiveCategory] = useState('all');
        useEffect(() => {
                    const interval = setInterval(() => {
          setIndex((prev) => (prev + 1) % 3);
       }, 5000);
  
      return () => clearInterval(interval)
            
     
  
  },[Index])

const createdAtDate = alldata && alldata.createdAt ? new Date(alldata && alldata.createdAt) :  null
const formatDate = (date) => {

  if (!date || isNaN(date)) {;
 return '';
  }
  const options = {
     year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour12: true
    };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
   
const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
   const handleMouseMove = (e) => {
    setGlowPosition({
      x: e.clientX,
      y: e.clientY
    });
  };
 const categories = ['all', ...new Set(pulishedData.map(project => project.projectcategory))];
        const [currP, setCurrP] = useState(1);
     const [pagePage] = useState(4)
  const filteredProjects = activeCategory === 'all' 
    ? pulishedData 
    : pulishedData.filter(project => project.projectcategory == activeCategory);
        const pageNum = [];
      
const allproject = filteredProjects.length
const contRef = useRef(null)
      const indexfirstString = (currP - 1) * pagePage;
     const indexlastString = currP * pagePage;
     const curreproject = filteredProjects.slice(indexfirstString, indexlastString)
  
     const extractFirstParagraph = (markdown) => {
    // Split markdown by double newline to separate paragraphs
    const paragraphs = markdown.split('\n\n')
    
    // Return the first paragraph (assuming paragraphs[0] is the first paragraph)
    if (paragraphs[0].length  > 200) {
        return `${paragraphs[0].slice(0, 180)}Read more`;
    }
    else{
        return paragraphs[0];
    }
   // return .slice(0, 180);
};
    
    for (let index = 1; index <= Math.ceil(allproject/pagePage); index++) {
       pageNum.push(index);  
        
    }
          const paginate = (pageNum) =>{
           setCurrP(pageNum)
      };
      let WebsiteReview = []
let WebsiteR1 = []
let WebsiteR2 = []
let WebsiteR3 = []
let WebsiteR4 = []
let WebsiteR5 = []

let WebsiteR11 = []
let WebsiteR12 = []
let WebsiteR13 = []
let WebsiteR14 = []
let WebsiteR15 = []



let WebsiteR111 = []
let WebsiteR112 = []
let WebsiteR113 = []
let WebsiteR114 = []
let WebsiteR115 = []

let AppReview = []
let OtherReview = []
const website = filteredProjects.filter((ab) => ab.projectcategory === 'Web Development')
const app = filteredProjects.filter((ab) => ab.projectcategory ===  'App Development')
const other = filteredProjects.filter((ab) => ab.projectcategory === 'Others')
website.forEach(element => {
    element.review.forEach(review => {
           WebsiteReview.push(review)
          switch (review?.rating.length) {
            case 1:
                  WebsiteR1.push(review)
                break;

             case 2:
                  WebsiteR2.push(review)
                break;    

            case 3:
                  WebsiteR3.push(review)
                break;  
             case 4:
                  WebsiteR4.push(review)
                break;       
           case 5:
                  WebsiteR5.push(review)
           break;
            default:
                WebsiteR1.push([])
                  WebsiteR2.push([])
                    WebsiteR3.push([])
                      WebsiteR4.push([])
                        WebsiteR5.push([])
                break;
          }
    });
     
});

app.forEach(element => {
    element.review.forEach(review => {
           AppReview.push(review)
          switch (review?.rating.length) {
            case 1:
                  WebsiteR11.push(review)
                break;

             case 2:
                  WebsiteR12.push(review)
                break;    

            case 3:
                  WebsiteR13.push(review)
                break;  
             case 4:
                  WebsiteR14.push(review)
                break;       
           case 5:
                  WebsiteR15.push(review)
           break;
            default:
                WebsiteR11.push([])
                  WebsiteR12.push([])
                    WebsiteR13.push([])
                      WebsiteR14.push([])
                        WebsiteR15.push([])
                break;
          }
    });
     
});

other.forEach(element => {
    element.review.forEach(review => {
           OtherReview.push(review)
          switch (review?.rating.length) {
            case 1:
                  WebsiteR111.push(review)
                break;

             case 2:
                  WebsiteR112.push(review)
                break;    

            case 3:
                  WebsiteR113.push(review)
                break;  
             case 4:
                  WebsiteR114.push(review)
                break;       
           case 5:
                  WebsiteR15.push(review)
           break;
            default:
                WebsiteR111.push([])
                  WebsiteR112.push([])
                    WebsiteR113.push([])
                      WebsiteR114.push([])
                        WebsiteR115.push([])
                break;
          }
    });
     
});

 
 const variables = [
    ['a', WebsiteR1],
    ['b', WebsiteR2],
    ['c', WebsiteR3],
    ['d', WebsiteR4],
    ['e', WebsiteR5],

  ];

   const variables1 = [
    ['a', WebsiteR11],
    ['b', WebsiteR12],
    ['c', WebsiteR13],
    ['d', WebsiteR14],
    ['e', WebsiteR15],

  ];

     const variables2 = [
    ['a', WebsiteR111],
    ['b', WebsiteR112],
    ['c', WebsiteR113],
    ['d', WebsiteR114],
    ['e', WebsiteR115],

  ];

  const [cartItems, setCartItems] = useState([]);

   const addToCart = (project) => {
       const savedCart = localStorage.getItem('cart');  
   const selectedCart =  localStorage.getItem('cart-storage')
    setCartItems([...cartItems, project]);
  };
//console.log("JSON.parse(selectedCart)", JSON.parse(selectedCart))
  const removeFromCart = (projectId) => {
    const savedCart = localStorage.getItem('cart');  
   const selectedCart =  localStorage.getItem('cart-storage')
    setCartItems(prevItems => {
      if (selectedCart) {
         if (projectId == JSON.parse(selectedCart)._id) {
         const existingItem = prevItems.find(item => item._id === projectId);
      if (existingItem) {
          localStorage.removeItem('cart-storage')
          return prevItems.filter(item => item._id !== projectId);
      }
      }   
      }
  
      return prevItems.filter(item => item._id !== projectId);
    });
  //  setCartItems(cartItems.filter(item => item._id !== projectId));
   localStorage.removeItem('cart', JSON.stringify(cartItems));
  };
  
const highest = variables.reduce((max, current) =>
    current[1].length >= 0 ? current[1].length > max[1].length ? current : max : [0][0]
  );
  const highest1 = variables1.reduce((max, current) =>
    current[1].length >= 0 ? current[1].length > max[1].length ? current : max : [0][0]
  );
    const highest2 = variables2.reduce((max, current) =>
    current[1].length >= 0 ? current[1].length > max[1].length ? current : max : [0][0]
  );
   console.log("alldaa project", pulishedData, highest1[1][0])

    const StarRating = (rating ) => {
     const stars = [];
   
     for (let i = 1; i <= 5; i++) {
       if (i <= rating) {
         stars.push(<IoStar />);
       } else {
         stars.push(<IoStarOutline />);
       }
     }
   
     return <div className="starRating">{stars}</div>;
   };



  // Save cart to localStorage whenever it changes
  useEffect(() => {
   
    if (cartItems.length > 0) {
       localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, cartItems.length]);

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
   useEffect(() => {
    const savedCart = localStorage.getItem('cart');  
   const selectedCart =  localStorage.getItem('cart-storage')
    if (savedCart && !selectedCart) {
      setCartItems(JSON.parse(savedCart));
      
    }
   else if (selectedCart) {
        setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === JSON.parse(selectedCart)._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === JSON.parse(selectedCart)._id 
            ? { ...item } 
            : item
        );
      }
      return [...prevItems, {...(JSON.parse(selectedCart))}];
    });
    }
  }, []);
    return <>

        <Head>
            <title>MYGL Tech - Project</title>
        </Head>

           <div className="shop-container">
      {/* Hero Section */}
      

  <section 
  className="sp__hero"
  style={{
    background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${image})`,
  }}
  onMouseMove={handleMouseMove}
  data-aos="fade"
>
  <div 
    className="footer-glow"
    style={{ left: `${glowPosition.x}px`, top: `${glowPosition.y}px` }}
  ></div>
  
  <div className="sp__hero-content">
    <h1 className="sp__hero-title">
      <span 
        className="sp__hero-title-line" 
        style={{color: '#ffffff'}}
        data-aos="fade-right"
        data-aos-delay="100"
      >
        My Project
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
      data-aos-delay="300"
    >
      Premium project development for visionary businesses, organization or individuals. 
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
      data-aos-delay="400"
    >
      <span style={{color: '#ffffff'}}>Explore</span>
      <div className="sp__hero-scroll-arrow" style={{color: '#ffffff'}}>
        <IoChevronDown />
      </div>
    </div>
  </div>
</section>

<section 
  className='latestpostssec' 
  ref={contRef} 
  style={{marginTop:'0', paddingTop:'5rem'}} 
  onMouseMove={handleMouseMove}
>
  <div 
    className="footer-glow"
    style={{
      left: `${glowPosition.x}px`,
      top: `${glowPosition.y}px`,
    }}
  ></div>

  {
     loading && pulishedData.length === 0 && <div className="wh_50 flex flex-center"><Spinner/></div>
  }

  {
     !loading && pulishedData.length === 0 && <div className="wh_50 flex flex-center">No Data Found</div>
  }
  {
     !loading && pulishedData.length > 0 && <>
     
     {
  pulishedWebData.length > 0 &&  <div className='container' style={{paddingTop:'2rem'}}>
    <div 
      className='latestpostsdata'
      data-aos="fade-up"
    >
      <div className='fetitle flex flex-sb'>
        <h3 style={{color: 'var(main-site-color)'}} data-aos="fade-right">Website Projects</h3>
        <a 
          href={`/projects/category/Website Development`} 
          className="viwa"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          View All
        </a>
      </div>
      
      <div className='latestposts'>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {pulishedWebData.slice(0, 3).map((blog, index) => (
              <div 
                onClick={() => window.open(`/projects/${blog.slug}`, '_self')} 
                key={blog._id} 
                className='lpost'
                data-aos="flip-up"
                data-aos-delay={index * 150}
              >
                <div className='lpostimg'>
                  <Link href={`/projects/${blog.slug}`}>
                    <img src={blog.images[0]} alt={blog.title}/>
                  </Link>
                </div>

                <div className='lpostinfo'>
                  <h3>{blog.title}</h3>
                  <TruncatedParagraph 
                    margin={0} 
                    url={`/projects/${blog.slug}`} 
                    wordLimit={150} 
                    text={blog.description} 
                  />
                  
                  <h4 className='flex mt-2'>
                    {blog.projectType === 'Showcase' ? (
                      <span className="fr">Free</span>
                    ) : (
                      <span className="pa">{blog.price}$</span>
                    )}
                  </h4>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  </div>
}
 
 {
   pulishedMobData.length > 0 &&
  <div className='container' style={{paddingTop:'2rem'}}>
    <div 
      className='latestpostsdata'
      data-aos="fade-up"
    >
      <div className='fetitle flex flex-sb'>
        <h3 style={{color: 'var(main-site-color)'}} data-aos="fade-right">App Projects</h3>
        <a 
          href={`/projects/category/Mobile Development`} 
          className="viwa"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          View All
        </a>
      </div>
      
      <div className='latestposts'>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {pulishedMobData.slice(0, 3).map((blog, index) => (
              <div 
                onClick={() => window.open(`/projects/${blog.slug}`, '_self')} 
                key={blog._id} 
                className='lpost'
                data-aos="flip-up"
                data-aos-delay={index * 150}
              >
                <div className='lpostimg'>
                  <Link href={`/projects/${blog.slug}`}>
                    <img src={blog.images[0]} alt={blog.title}/>
                  </Link>
                </div>

                <div className='lpostinfo'>
                  <h3>{blog.title}</h3>
                  <TruncatedParagraph 
                    margin={0} 
                    url={`/projects/${blog.slug}`} 
                    wordLimit={150} 
                    text={blog.description} 
                  />
                  
                  <h4 className='flex'>
                    {blog.projectType === 'Showcase' ? (
                      <span className="fr">Free</span>
                    ) : (
                      <span className="pa">{blog.price}$</span>
                    )}
                  </h4>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  </div>

 }


  {
    pulishedData.filter(ba => (ba.projectcategory === 'Graphic & UI/UX Design' || ba.projectcategory === 'Network Design')).length > 0 && <div className='container'>
    <div 
      className='featuredposts latestpostsdata' 
      style={{paddingBottom: 0, paddingTop: 0}}
      data-aos="fade-up"
    >
      <div className='fetitle flex flex-sb' data-aos="fade-right">
        <h3 style={{color: 'var(main-site-color)'}}>UI/UX & GRAPHIC Design Project</h3>
        <a 
          href={`/projects/category/Graphic Design`} 
          className="viwa"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          View All
        </a>
      </div>
      
      <div className='ffeposts flex'>
        <Swiper
          slidesPerView={"auto"}
          freeMode={true}
          spaceBetween={25}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}
          className='mySwiper'
          modules={[FreeMode, Autoplay]}
        >
          { loading && pulishedData.length === 0 ? (
            <Spinner />
          ) : (
            <>
              {  !loading && pulishedData.length > 0 && pulishedData
                .filter(ba => (ba.projectcategory === 'Graphic & UI/UX Design' || ba.projectcategory === 'Network Design'))
                .slice(0,6)
                .map((blog, index) => (
                  <SwiperSlide key={blog._id} data-aos="zoom-in" data-aos-delay={index * 100}>
                    <div className='fpost' key={blog._id}>
                      <Link href={`/projects/${blog.slug}`}>
                        <img src={blog.images[0]} alt={blog.title} />
                      </Link>
                      
                      <div className='tegs flex' style={{background:'var(main-hover-color)'}}>
                        <Link 
                          href={`/projects/category/${blog.projectcategory}`} 
                          className='vr' 
                          style={{color:'var(main-hover-color)'}}
                        >
                          <span className='ai'></span>{blog.projectcategory}
                        </Link> 
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              }
            </>
          )}
        </Swiper>
      </div>
    </div>
  </div>
  }
  

 {  pulishedData
              .filter(ab => ab.projectcategory === "Video Editing").length > 0 &&
  <div className='container' style={{paddingTop:'2rem'}}>
    <div 
      className='latestpostsdata'
      data-aos="fade-up"
    >
      <div className='fetitle flex flex-sb'>
        <h3 style={{color: 'var(main-site-color)'}} data-aos="fade-right">Others</h3>
        <a 
          href={`/projects/category/Video Editing`} 
          className="viwa"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          View All
        </a>
      </div>
      
      <div className='latestposts'>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {pulishedData
              .filter(ab => ab.projectcategory === "Video Editing")
              .slice(0, 3)
              .map((blog, index) => (
                <div 
                  onClick={() => window.open(`/projects/${blog.slug}`, '_self')} 
                  key={blog._id} 
                  className='lpost'
                  data-aos="flip-up"
                  data-aos-delay={index * 150}
                >
                  <div className='lpostimg'>
                    <Link href={`/projects/${blog.slug}`}>
                      <img src={blog.images[0]} alt={blog.title}/>
                    </Link>
                  </div>

                  <div className='lpostinfo'>
                    <h3>{blog.title}</h3>
                    <TruncatedParagraph 
                      margin={0} 
                      url={`/projects/${blog.slug}`} 
                      wordLimit={150} 
                      text={blog.description} 
                    />
                  </div>
                </div>
              ))
            }
          </>
        )}
      </div>
    </div>
  </div>
}
     
     </>
  }
</section>

      </div>
    </>
}