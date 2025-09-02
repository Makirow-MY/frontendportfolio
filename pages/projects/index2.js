import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { FaCartShopping, FaCheckDouble, FaChevronLeft, FaChevronRight, FaEyeSlash, FaFlask, FaLock } from "react-icons/fa6";
import { IoArrowBack, IoArrowForward, IoCart, IoCartOutline, IoChevronBack, IoChevronForward, IoMenuOutline, IoStar, IoStarOutline, IoTrash } from "react-icons/io5";

export default function shop() {
      const [refresh, setRefresh] = useState(false);
      const {alldata, loading} = useFetchData('/api/project');
      const pulishedData = alldata.filter(ab => ab.status === 'publish')

   
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
            <title>Shop</title>
        </Head>

           <div className="shop-container">
      {/* Hero Section */}
      <section className="shop-hero" onClick={() => setcartShow(false)} onMouseMove={handleMouseMove}
    >
      {/* Animated background glow */}
      <div 
        className="footer-glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      ></div>
        <div className="hero-content" onMouseMove={handleMouseMove}
    >
      {/* Animated background glow */}
      <div 
        className="footer-glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      ></div>
          <h1 className="hero-title">Premium Source Code Marketplace</h1>
          <p className="hero-subtitle">
            Acquire production-ready projects crafted by a senior developer
          </p>
          <div className="hero-scroll-indicator" onClick={() =>{
            contRef.current.scrollIntoView({
            behavior: 'smooth'
        })
          }}>
            <span>Explore Projects</span>
            <div className="scroll-arrow"></div>
          </div>
        </div>
        <div className="hero-background"></div>
      </section>

      <section onClick={() => setcartShow(false)} className="shop-categories" onMouseMove={handleMouseMove}
    >
      {/* Animated background glow */}
      <div 
        className="footer-glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      ></div>
                   <div className="project_buttons">
          {categories.map(category => (
            <button
              key={category}
              className={` ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

          {
                                                      curreproject.length === 0 || pageNum.length <= 1 || loading ? ("") : (
                                                          <div className="blogspaginationbtn flex " style={{display:'flex', justifyContent:'center'}}>
                                                                      <button onClick={() => paginate(currP - 1)} disabled={ currP === 1}><IoChevronBack style={{fontSize: '20'}} /></button>
                                                                      {
                                                                           pageNum.slice(Math.max(currP - 3, 0), Math.min(currP + 2, pageNum.length)).map(num => (
                                                                              <button key={num} onClick={
                                                                                  () => paginate(num)
                                                                              } className={`${currP === num ? 'active' : ''}`}>
                                                                                  {num}
                                                                              </button>
                                                                           ))
                              
                                                                      }
                              
                              <button onClick={() => paginate(currP + 1)} disabled={ curreproject.length < pagePage}><IoChevronForward style={{fontSize: '20'}} /></button>
                                                          </div>
                                                      ) 
                                                   }

      </section>
      
         <section onClick={() => setcartShow(false)} className="projects-grid" ref={contRef} onMouseMove={handleMouseMove}
    >
      {/* Animated background glow */}
      <div 
        className="footer-glow"
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
        }}
      ></div>
        {curreproject.map(project => (
          <div className="project-card" key={project._id}>
            <div className="project-media">
              <div className="project-badge">{project.projectcategory}</div>
              <img 
                src={project.images[0]} 
                alt={project.title} 
                className="project-thumbnail"
              />

              <div className="project-overlay">
                <button 
                  className="preview-btn"
                  onClick={() => window.open(project.livepreview, '_blank')}
                >
                  Live Preview
                </button>
              </div>
            </div>
            <div className="project-details">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{extractFirstParagraph(project.description)}</p>
              <div className="project-meta">
                <span className="tech-stack">

                    {/* {
                        project.projectcategory === 'Web Development'  && StarRating(highest[1][0].rating.length)

                    }

                     {
                        project.projectcategory === 'App Development'  && StarRating(highest1[1][0].rating.length)

                    }

                    {
                        project.projectcategory === 'Others'  && StarRating(highest2[1][0].rating.length)

                    } */}
                  {/* {project.techStack.join(' • ')} */}
                </span>
                <span className="project-price">
                 ${project.price} 
                  </span>
              </div>
              <div className="project-actions">
                {
                   cartItems.filter(ab => ab._id == project._id).length == 0 && <button 
                  className="add-to-cart"
                  onClick={() => addToCart(project)}
                >
                  Add to Cart
                </button>
                }

                 {
                   cartItems.filter(ab => ab._id == project._id).length > 0 && <div className="doobr">
                    <FaCheckSquare />
                   </div>
                }
                
                
                <a 
                  className="view-details"
                  href={`/projects/${project.slug}`}
                >
                  Details
                </a>
              </div>
            </div>
          </div>
        ))}          
      </section>

{
  cartItems.length > 0 &&  !cartShow  &&   <button 
  onClick={() => setcartShow(true)}
  title="view cart"
          className="back-to-top  cart"
          aria-label="Back to top"
        >
          <FaCartShopping size={20} />
          <span>{cartItems.length}</span>
        </button>
}
       
    
      <div className={`cart-sidebar ${cartItems.length > 0  && cartShow ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>
            Your Cart
           
            </h3>
            <div className="flex gap-1">
               <button className="close-cart" title="hide cart" onClick={() => setcartShow(false)}>
            <FaChevronRight/>
          </button>
               <button className="close-cart" title="delete cart" onClick={() => {setCartItems([])
                localStorage.removeItem("cart")
               }}>
            <IoTrash />
          </button>
            </div>
         
        </div>
        <div className="cart-items">
          {cartItems.reverse().map(item => (
           
            <div className="cart-item" key={item._id}>
              <img src={item.images[0]} alt={item.title} />
              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <span>${
                item.price
                }</span>
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
          <div className="cart-total one">
            <span>Total Item</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="cart-total">
            <span>Total Ammount:</span>
            <span>${cartItems.reduce((sum, item) => sum + item.price, 0)}</span>
          </div>
          <a
          style={{width: '100%'}}
          href={`/projects/checkout`}
          className="checkout-btn">Proceed to Checkout</a>
        </div>
      </div>
    
      </div>
    </>
}