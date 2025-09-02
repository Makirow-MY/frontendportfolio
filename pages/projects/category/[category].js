import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCheckSquare, FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaCartShopping, FaCheckDouble, FaChevronLeft, FaChevronRight, FaEyeSlash, FaFlask, FaLock } from "react-icons/fa6";
import { IoArrowBack, IoArrowForward, IoCart, IoCartOutline, IoChevronBack, IoChevronForward, IoMenuOutline, IoStar, IoStarOutline, IoTrash } from "react-icons/io5";
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import TruncatedParagraph from "@/components/TruncateParagraph";
import Projectsearch from "@/components/Projectsearch";


export default function shop() {
      const [refresh, setRefresh] = useState(false);
      const router = useRouter()
          const {category} = router.query;
      const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
    const { alldata, loading } = useFetchData(`/api/project?projectcategory=${category}`);
let cat = category
      const pulishedData = alldata.filter(ab => ab.status === 'publish')

   
      const [cartShow, setcartShow] = useState(false);
       const [Index, setIndex] = useState(0)
     const [activeCategory, setActiveCategory] = useState('all');
       const [ActiveLink, setActiveLink] = useState('');
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
         }, [ActiveLink, router.pathname]);
        useEffect(() => {
                    const interval = setInterval(() => {
          setIndex((prev) => (prev + 1) % 3);
       }, 5000);
  
      return () => clearInterval(interval)
            
     
  
  },[Index])
    const categoryDescriptions = {
        'Website Development': {
            title: 'Website Development Projects',
            description: 'Explore our collection of professionally developed websites. From simple landing pages to complex web applications, see how we bring ideas to life on the web.'
        },
        'Mobile Development': {
            title: 'Mobile App Projects',
            description: 'Browse through our portfolio of mobile applications. Experience our work on iOS and Android platforms with cutting-edge technologies.'
        },
        'Graphic Design': {
            title: 'Design Portfolio',
            description: 'Discover our creative design works including UI/UX designs, graphic designs, and network designs that combine aesthetics with functionality.'
        },
        'Video Editing': {
            title: 'Video Content Projects',
            description: 'View our video editing and content creation portfolio showcasing our storytelling through motion graphics and video production.'
        }
    };

    // Get the appropriate description based on the category
    const categoryInfo = categoryDescriptions[category] || {
        title: `Category ${category}`,
        description: 'Explore our collection of projects in this category.'
    };
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
   const handleMouseMove = (e) => {
    setGlowPosition({
      x: e.clientX,
      y: e.clientY
    });
  };
 const categories = ['all', ...new Set(pulishedData.map(project => project.projectType))];
        const [currP, setCurrP] = useState(1);
     const [pagePage] = useState(6)
  const filteredProjects = activeCategory === 'all' 
    ? pulishedData 
    : pulishedData.filter(project => project.projectType == activeCategory);
        const pageNum = [];
      const [userData, setUserData] = useState(null);
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
        return `${paragraphs[0].slice(0, 180)}... Read more`;
    }
    else{
        return paragraphs[0];
    }
   // return .slice(0, 180);
};
      const [searchInput, setSearchInput] = useState(false)
       
       const handleSearchOpen = () =>{
           setSearchInput(!searchInput);
       }
       const handleSearchClose = () =>{
           setSearchInput(false);
       }
    for (let index = 1; index <= Math.ceil(allproject/pagePage); index++) {
       pageNum.push(index);  
        
    }
          const paginate = (pageNum) =>{
           setCurrP(pageNum)
      };

  const [cartItems, setCartItems] = useState([]);

   const addToCart = (project) => {
       const savedCart = localStorage.getItem('cart');  
   const selectedCart =  localStorage.getItem('cart-storage1')
    setCartItems([...cartItems, project]);
  };
//console.log("JSON.parse(selectedCart)", JSON.parse(selectedCart))
  const removeFromCart = (projectId) => {
    const savedCart = localStorage.getItem('cart');  
   const selectedCart =  localStorage.getItem('cart-storage1')
    setCartItems(prevItems => {
      if (selectedCart) {
         if (projectId == JSON.parse(selectedCart)._id) {
         const existingItem = prevItems.find(item => item._id === projectId);
      if (existingItem) {
          localStorage.removeItem('cart-storage1')
          return prevItems.filter(item => item._id !== projectId);
      }
      }   
      }
  
      return prevItems.filter(item => item._id !== projectId);
    });
  //  setCartItems(cartItems.filter(item => item._id !== projectId));
   localStorage.removeItem('cart', JSON.stringify(cartItems));
  };


  // Save cart to localStorage whenever it changes
  useEffect(() => {
   
    if (cartItems.length > 0) {
       localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, cartItems.length]);

    useEffect(() => {
        const interval =  setInterval(() => {
              setUserData(null);  
  }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [userData]);


   useEffect(() => {
    const savedCart = localStorage.getItem('cart');  
   const selectedCart =  localStorage.getItem('cart-storage1')
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
    

     
   
    const getHighestRating = (projects) => {
        const ratings = projects.flatMap(project => 
            project.review?.map(review => review.rating.length) || []
        );
        return Math.max(...ratings, 0);
    };

    const StarRating = ({ rating }) => (
        <div className="starRating text-center">
            {[...Array(5)].map((_, i) => (
                i < rating ? <IoStar key={i} /> : <IoStarOutline key={i} />
            ))}
        </div>
    );


    return (
        <>
            <Head>
                <title>MYG Tech - {categoryInfo.title} Project Category</title>
            </Head>
            <div className="blogcategory">


                <section 
                    className="tophero" 
                    style={{
                        background: `linear-gradient(135deg, rgba(0, 0, 255, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%), url(${userData?.images[0] || 'https://picsum.photos/1920/1080?random=99'})`,
                        backgroundSize: 'cover',
                        height: '100vh',
                        backgroundPosition: 'bottom',
                        backgroundRepeat: 'no-repeat',
                        overflow: 'hidden'
                    }}
                >
                    <div className="container">
                        <div className="sp__hero-content" style={{marginTop:'10rem'}}>
                          
                           <div className="toptitlecont cat" style={{marginTop: '-2rem'}}>
    <h1>Category <span style={{color:'var(--main-site-color)'}}>{category}</span></h1>
    <p style={{width:'80%', color:'#ffffff'}}>{categoryInfo.description}</p>
                                  
                                  <div className='subemail'>
                                      <form className='flex'>
                                            <input onClick={handleSearchOpen} type='text' placeholder={`Search here`} />
                                            <button><FaSearch /></button>
                                      </form>
                                  </div>
                                  
                                   </div>
                            {/* <div className="toptitlecont   flex flex-col" style={{padding: '0 6rem', paddingLeft:'0', marginTop:'auto', }}>
                                {userData ? (
                                    <>
                                        <h1 className="sp__hero-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 3rem)'}}><span className="sp__hero-title-line sp__hero-title-line--highlight">{userData.title}</span></h1>
                                     <p style={{color:"#ffffff"}}>
                                      {
                                        extractFirstParagraph(userData.description)
                                      }
                                      </p> 
                                      
                                    </>
                                ) : (
                                    <>
                                        <h1 className="sp__hero-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 3rem)', marginLeft:'0'}}>Category <span  className="sp__hero-title-line sp__hero-title-line--highlight">{category}</span></h1>
                                        <p className="sp__hero-subtitle" style={{
                                            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
  maxWidth:'700px',
  margin: '0 auto2.5rem',
  opacity: '0.9',
  fontWeight: '350',
 
                                        }}> I write about web, mobile development and modern javascript frameworks.</p>
                                     <div className='subemail' style={{marginTop:'0'}}>
                                                                         <form className='flex'>
                                                                               <input onClick={handleSearchOpen} type='text' placeholder='Search project here' />
                                                                               <button><FaSearch /></button>
                                                                         </form>
                                                                     </div>
                                    </>
                                )}
                            </div> */}
                        </div>
                    </div>

                    <div className='carolousel'>
                        <Swiper
                            effect="coverflow"
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            loop={true}
                            autoplay={{ delay: 1000, disableOnInteraction: false }}
                            modules={[EffectCoverflow, Autoplay]}
                            coverflowEffect={{
                                scale: 0.95,
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 2,
                                slideShadows: true
                            }}
                            on={{
                                slideChange: function() {
                                   // setUserData(pulishedData);
                                }
                            }}
                        >
                            {pulishedData.map(blog => (
                                <SwiperSlide key={blog._id} className='swiper-slide'>
                                    <a 
                                        onClick={() => setUserData(blog)} 
                                        className='swiper-slide-link'
                                    >
                                        <img src={blog.images[0]} />
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>


                       {/* Projects Display Section */}
  <section 
    className="prodisp"  
    onClick={() => setcartShow(false)} 
    onMouseMove={handleMouseMove}
    data-aos="fade-up"
  >
    <div className="container">
      <div 
        className="project_buttons"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {categories.map((category, index) => (
          <button
            key={category}
            className={` ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
            data-aos="zoom-in"
            data-aos-delay={100 + (index * 50)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1) === 'Showcase' && 'Free'}
            {category.charAt(0).toUpperCase() + category.slice(1) === 'For Sale' && 'Purchase'}
            {(category.charAt(0).toUpperCase() + category.slice(1) !== 'For Sale' && 
              category.charAt(0).toUpperCase() + category.slice(1) !== 'Showcase') && 'All'}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {/* Animated background glow */}
        <div 
          className="footer-glow"
          style={{
            left: `${glowPosition.x}px`,
            top: `${glowPosition.y}px`,
          }}
        ></div>
        
        {curreproject.map((project, index) => (
          <div 
            className="project-card" 
            key={project._id}
            data-aos="flip-up"
            data-aos-delay={index * 50}
          >
            <div className="project-media">
              {category == 'Graphic Design' && (
                <div 
                  className="project-badge"
                  data-aos="zoom-in"
                  data-aos-delay={index * 50 + 100}
                >
                  {project.projectcategory}
                </div>
              )}
              
              <img 
                src={project.images[0]} 
                alt={project.title} 
                className="project-thumbnail"
              />

              <div className="project-overlay">
                <button 
                  className="preview-btn"
                  onClick={() => window.open(project.livepreview, '_blank')}
                  data-aos="zoom-in"
                  data-aos-delay={index * 50 + 150}
                >
                  Live Preview
                </button>
              </div>
            </div>
            
            <div className="project-details">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{extractFirstParagraph(project.description)}</p>
              
              <div className="project-meta">
                <span className="tech-stack w-100">
                  <StarRating 
                    rating={getHighestRating(curreproject.filter(ab => ab.projectcategory === project.projectcategory))} 
                  />
                </span>
              </div>
              
              {project.projectType === 'For Sale' ? (
                <div className="project-actions">
                  {cartItems.filter(ab => ab._id == project._id).length == 0 ? (
                    <button 
                      className="add-to-cart"
                      onClick={() => addToCart(project)}
                      data-aos="zoom-in"
                      data-aos-delay={index * 50 + 200}
                    >
                      <FaShoppingCart /> ${project.price}
                    </button>
                  ) : (
                    <div 
                      className="doobr"
                      data-aos="zoom-in"
                      data-aos-delay={index * 50 + 200}
                    >
                      <FaCheckSquare />
                    </div>
                  )}
                  
                  <a 
                    className="view-details text-center"
                    href={`/projects/${project.slug}`}
                    data-aos="zoom-in"
                    data-aos-delay={index * 50 + 250}
                  >
                    View
                  </a>
                </div>
              ) : (
                <div className="project-actions">
                  <a 
                    className="view-details"
                    href={`/projects/${project.slug}`}
                    data-aos="zoom-in"
                    data-aos-delay={index * 50 + 200}
                  >
                    View
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}          
      </div>

      {/* Pagination */}
      {curreproject.length === 0 || pageNum.length <= 1 || loading ? null : (
        <div 
          className="blogspaginationbtn flex"
          style={{display:'flex', justifyContent:'center'}}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <button 
            onClick={() => paginate(currP - 1)} 
            disabled={currP === 1}
            data-aos="fade-right"
            data-aos-delay="350"
          >
            <IoChevronBack style={{fontSize: '20'}} />
          </button>
          
          {pageNum.slice(Math.max(currP - 3, 0), Math.min(currP + 2, pageNum.length)).map((num, index) => (
            <button 
              key={num} 
              onClick={() => paginate(num)}
              className={`${currP === num ? 'active' : ''}`}
              data-aos="zoom-in"
              data-aos-delay={350 + (index * 50)}
            >
              {num}
            </button>
          ))}
          
          <button 
            onClick={() => paginate(currP + 1)} 
            disabled={curreproject.length < pagePage}
            data-aos="fade-left"
            data-aos-delay="350"
          >
            <IoChevronForward style={{fontSize: '20'}} />
          </button>
        </div>
      )}
    </div>
  </section>

  {/* Cart Button */}
  {(ActiveLink == 'cart' || (cartItems.length > 0 && !cartShow)) && (
    <button 
      onClick={() => setcartShow(true)}
      title="view cart"
      className="back-to-top cart"
      aria-label="Back to top"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <FaCartShopping size={20} />
      <span>{cartItems.length}</span>
    </button>
  )}

  {/* Cart Sidebar */}
  <div 
    className={`cart-sidebar ${(ActiveLink == 'cart' || (cartItems.length > 0 && cartShow)) ? 'active' : ''}`}
    data-aos="fade-left"
    data-aos-delay="100"
  >
    <div className="cart-header">
      <h3>Your Cart</h3>
      <div className="flex gap-1">
        <button 
          className="close-cart" 
          title="hide cart" 
          onClick={() => {
            setcartShow(false);
            ActiveLink == 'cart' ? window.location.href = `/projects/category/${category}` : '';
          }}
          data-aos="fade-left"
          data-aos-delay="150"
        >
          <FaChevronRight/>
        </button>
        <button 
          className="close-cart" 
          title="delete cart" 
          onClick={() => {
            setCartItems([]);
            localStorage.removeItem("cart");
            ActiveLink == 'cart' ? window.location.href = `/projects/category/${category}` : '';
          }}
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <IoTrash />
        </button>
      </div>
    </div>
    
    <div className="cart-items">
      {cartItems.reverse().map((item, index) => (
        <div 
          className="cart-item" 
          key={item._id}
          data-aos="fade-up"
          data-aos-delay={index * 50}
        >
          <img src={item.images[0]} alt={item.title} />
          <div className="cart-item-details">
            <h4>{item.title}</h4>
            <span>${item.price}</span>
          </div>
          <button 
            className="remove-item"
            onClick={() => removeFromCart(item._id)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
    
    <div className="cart-footer">
      <div 
        className="cart-total one"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <span>Total Item</span>
        <span>{cartItems.length}</span>
      </div>
      <div 
        className="cart-total"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <span>Total Amount:</span>
        <span>${cartItems.reduce((sum, item) => sum + item.price, 0)}</span>
      </div>
      <a
        style={{width: '100%'}}
        href={`/projects/checkout`}
        className="checkout-btn"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        Proceed to Checkout
      </a>
    </div>
  </div>

  {/* Search Modal */}
  {searchInput && <Projectsearch cls={() => setSearchInput(false)} />}
            </div>
        </>
    );
}