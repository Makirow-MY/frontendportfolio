import { FaDollarSign, FaDownload, FaExternalLinkAlt, FaGithub, FaStar } from "react-icons/fa";
import { IoCalendarOutline, IoSearch, IoStar, IoStarOutline, IoTrash, IoWarning } from "react-icons/io5";
import { BsCopy } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { FaCartShopping, FaX } from "react-icons/fa6";
import Link from "next/link";
import Head from "next/head";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { faker } from "@faker-js/faker";
import Projectsearch from "@/components/Projectsearch";






const ProjectSlug = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { alldata } = useFetchData('/api/project');
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    const [messageOk, setmessageOk] = useState('');
    const [searchInput, setSearchInput] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [blogData, setBlogData] = useState({ project: {}, review: [] });
    const [NewReview, setNewReview] = useState({
        ReveiewID: '', title: '', projectSlug: '', name: '', email: '', image: '',
        role: "", company: "", website: "", rating: "", message: "", consent: false,
    });
    const [delet, setDelet] = useState(false);
    const [deleteEmail, setDeleteEmail] = useState("");
    const [addedToCart, setAddedToCart] = useState(false);
    const [testimonialView, setTestimonialView] = useState('recent'); // 'top', 'recent', 'oldest'
    const [testimonialPage, setTestimonialPage] = useState(1);
    
    const commentRef = useRef(null);
    const replyformRef = useRef(null);
    const filterProj = alldata.filter((ab) => slug === ab.slug);
    const [saveCart, setSaveCart] = useState(null);

    // Fetch project data
    useEffect(() => {
      setSaveCart(localStorage.getItem('cart'))
        const fetchData = async () => {
            if (slug) {
                try {
                    const response = await axios.get(`/api/project/${slug}`);
                    setBlogData(response.data);
                } catch (error) {
                    toast.error("Something went wrong while fetching data, try again", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [slug, delet, saveCart, addedToCart]);

    // Image carousel effect
    useEffect(() => {
        if (blogData.project.images.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % blogData.project.images.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [blogData.project?.images]);

    // Format date
    const formatDate = (date) => {
        if (!date || isNaN(date)) return '';
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour12: true
        }).format(new Date(date));
    };

    // Star rating component
    const StarRating = (rating) => {
        return (
            <div className="starRating">
                {[1, 2, 3, 4, 5].map((i) => 
                    i <= rating ? <IoStar key={i} /> : <IoStarOutline key={i} />
                )}
            </div>
        );
    };

    // Handle testimonial submission
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        
        if (!NewReview.consent) {
            setmessageOk("You must consent to displaying testimonial");
            setTimeout(() => setmessageOk(''), 3000);
            return;
        }

        try {
            const gender = Math.random() > 0.5 ? 'female' : 'male';
            const imageNumber = Math.floor(Math.random() * 100);
            const image = faker.image.avatar() || `https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/${gender}/512/${imageNumber}.jpg`;

            const reviewData = {
                ...NewReview,
                image,
                title: blogData.project.title,
                projectSlug: slug
            };

            const response = await axios.post(`/api/project/${slug}`, reviewData);
            
            setBlogData(prev => ({
                ...prev,
                review: [response.data, ...prev.review]
            }));

            setNewReview({
                title: '', projectSlug: '', name: '', email: '', image: '',
                role: "", company: "", website: "", rating: "", message: "", consent: false,
            });

            setmessageOk("✅ Testimonial published successfully");
            toast.success("✅ Testimonial published successfully");
            setTimeout(() => setmessageOk(''), 3000);

            if (commentRef.current) {
                commentRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            toast.error("❌ Failed to publish testimonial");
        }
    };

    // Handle testimonial deletion
    const HandleDeletForm = async (e) => {
        e.preventDefault();
      
        if (!deleteEmail) {
            setmessageOk("Email must be provided");
            setTimeout(() => setmessageOk(''), 3000);
            return;
        }

        if (deleteEmail !== NewReview.email) {
            setmessageOk("Sorry, email is incorrect. Only the owner can delete");
            setTimeout(() => setmessageOk(''), 3000);
            return;
        }

        try {
            await axios.post(`/api/project/${slug}`, {
                commentId: NewReview.ReveiewID,
                commentmainComment: NewReview.consent,
                deleteEmail: deleteEmail
            });

            setNewReview({
                title: '', projectSlug: '', name: '', email: '', image: '',
                role: "", company: "", website: "", rating: "", message: "", consent: false,
            });

            setDelet(false);
            setDeleteEmail('');
            toast.success("✅ Testimonial deleted successfully");
        } catch (error) {
            toast.error("Incorrect email. Only the sender can delete post");
        }
    };


 
    // Paginated testimonials
    const getPaginatedTestimonials = () => {
        let sortedTestimonials = [...blogData.review];
        
        // Sort based on selected view
        switch (testimonialView) {
            case 'top':
                sortedTestimonials.sort((a, b) => b.rating.length - a.rating.length);
                break;
            case 'oldest':
                sortedTestimonials.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'recent':
            default:
                sortedTestimonials.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
        }
        
        // Filter only consented testimonials
        const consentedTestimonials = sortedTestimonials.filter(review => review.consent);
        
        // Paginate results (5 per page)
        const startIndex = (testimonialPage - 1) * 3;
        return consentedTestimonials.slice(startIndex, startIndex + 3);
    };

      const [likeCounts, setLikeCounts] = useState({});
    useEffect(() => {
        const countLikes = () => {
          const counts = {};
          alldata.forEach(blog => {
            counts[blog.projectcategory] = (counts[blog.projectcategory] || 0) + 1;
           
          });
          setLikeCounts(counts);
        };
    
        if (alldata.length > 0) {
          countLikes();
        }
      }, [alldata]);

const testimonials = getPaginatedTestimonials();
    const totalTestimonials = blogData.review.filter(r => r.consent).length;
    const hasNextPage = testimonials.length === 3 && (testimonialPage * 3) < totalTestimonials;
    const hasPreviousPage = testimonialPage > 1;
    
    // Render testimonials
    const RenderComments = () => {
        const testimonials = getPaginatedTestimonials();
        
        if (testimonials.length === 0) {
            return <div className="flex flex-center w-100">No testimonials found</div>;
        }

        return (
            <>
                <div className="testimonial-controls">
                     <div className="view-options">
                    <button 
                        className={testimonialView == 'recent' ? 'active' : ''}
                        onClick={() => {
                            setTestimonialView('recent');
                            setTestimonialPage(1); // Reset to first page when changing view
                        }}
                    >
                        Recent
                    </button>
                    <button 
                        className={testimonialView === 'top' ? 'active' : ''}
                        onClick={() => {
                            setTestimonialView('top');
                            setTestimonialPage(1);
                        }}
                    >
                        Top Rated
                    </button>
                    <button 
                        className={testimonialView === 'oldest' ? 'active' : ''}
                        onClick={() => {
                            setTestimonialView('oldest');
                            setTestimonialPage(1);
                        }}
                    >
                        Oldest
                    </button>
                </div>
                </div>
                
                {testimonials.map((testimonial) => (
                    <div className="blogcomment mt-1" key={testimonial._id}>
                        <div className="flex flex-sb">
                            <div className="flex gap-1 w-100" style={{ alignItems: 'center', display: 'flex' }}>
                                <img src={testimonial.image} alt={testimonial.name} />
                                <div className="subhead">
                                    <h3>{testimonial.name}</h3>
                                    <h4>{new Date(testimonial.createdAt).toLocaleString()}</h4>
                                </div>
                            </div>
                            <button 
                                title="Delete review" 
                                className="modbtn" 
                                onClick={() => setDelet(true)}
                            >
                                <IoTrash />
                            </button>
                        </div>
                        <h4>{StarRating(testimonial.rating.length)}</h4>
                        <p style={{ fontWeight: '300' }}>{testimonial.message}</p>
                    </div>
                ))}
                
                  <div className="test blogpagination">
                {hasPreviousPage && (
                    <button onClick={() => setTestimonialPage(testimonialPage - 1)}>
                        Previous
                    </button>
                )}
                
                {hasNextPage && (
                    <button onClick={() => setTestimonialPage(testimonialPage + 1)}>
                        Next
                    </button>
                )}
            </div>
            </>
        );
    };

useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    const addToCart = (project) => {
        setAddedToCart(true)
        const updatedCart = [...cartItems.filter(item => item._id !== project._id), project];
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.href = `/projects/category/${project.projectcategory}#cart`;
    };

    if (loading) {
        return <div className="wh_100 flex flex-center"><Spinner /></div>;
    }


    const createdAtDate = blogData?.project?.createdAt ? new Date(blogData.project.createdAt) : null;
    const blogURL = `${window.location.origin}/projects/${slug}`;
    const filterProjects = alldata.filter(ab => ab.status === 'publish' && ab.slug !== slug);
    
    const prevpro = () => {
        setCurrentIndex(prev => 
            prev === 0 ? blogData.project?.images.length - 1 : prev - 1
          );
    };

    const nextpro = () => {
        setCurrentIndex(prev => 
            prev === blogData.project?.images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <>
            <Head>
                <title> MYG Tech - {blogData.project?.title || 'Project'}</title>
            </Head>

            

            <div className="blogslugpage">
                {filterProj[0] && (
                    <div className="container">
                        <div  className="blogslugpagecont"
        data-aos="fade-up" >
                            <div className="leftsitedetails">
                                {/* Image Carousel */}
                              <div 
            className="testimonials-carousel"
            data-aos="zoom-in"
          >
                                    <button 
              className="nav-button prev" 
              onClick={prevpro}
              data-aos="fade-right"
              data-aos-delay="100"
            >&lt;</button>
                                    
                                    <div className="testimonials-track">
                                        {blogData.project.images.map((img, index) => (
                                            <div 
                                                className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
                                                key={img}
                                             data-aos="flip-up"
                      data-aos-delay={400 + (index * 100)}
                                            >
                                                <img src={img} alt={blogData.project.title} />
                                            </div>
                                        ))}
                                    </div>
                                    
                                   <button 
              className="nav-button next" 
              onClick={nextpro}
              data-aos="fade-left"
              data-aos-delay="100"
            >&gt;</button>
                                </div>
                                
                                {/* Project Info */}
                                <div className="slugbloginfopub" data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="flex gap-2">
              <div 
                className="adminslug"
                data-aos="fade-right"
                data-aos-delay="250">
                                            <img src="/img/coder.jpg" alt="Author" />
                                            <span>By MYGL Tech</span>
                                        </div>
                                        <div className="adminslug"  data-aos="fade-up"
                data-aos-delay="300">
                                            <IoCalendarOutline />
                                            <span>{formatDate(createdAtDate)}</span>
                                        </div>
                                        <div className="adminslug" data-aos="fade-left"
                data-aos-delay="350">
                                            <FaStar />
                                            <span>Ratings ({blogData.review?.length || 0})</span>
                                        </div>
                                    </div>
                                    
                                     <div 
              className="shareblogslug"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <a 
                title="View Live Demo" 
                target="_blank" 
                href={blogData.project.livepreview}
                data-aos="zoom-in"
                data-aos-delay="450">
                                            <FaExternalLinkAlt />
                                        </a>
                                       
                                        {
                                            (blogData.project.projectType === 'Showcase' &&  (blogData.project.projectcategory === 'Website Development'
                                            ||  blogData.project.projectcategory === 'Mobile Development')) &&  <a 
                  target="_blank" 
                  href={blogData.project.repositoryUrl}
                  data-aos="zoom-in"
                  data-aos-delay="500"
                >
                                            <FaGithub />
                                        </a>
                                        }

                                        {
                                            blogData.project.projectType === 'For Sale'&& <>
                                         {(addedToCart ||  (saveCart&& JSON.parse(saveCart).some(ab => ab._id == blogData.project._id))) ? (
                                           
                                           <></>
                                        ) : (
                                            <a
                                                title="Purchase Source code"   data-aos="zoom-in"
                      data-aos-delay="550"
                                                onClick={() => {addToCart( blogData.project);
                                                    //localStorage.setItem('cart', JSON.stringify([blogData.project]))
                                                }}
                                            >
                                                <FaDollarSign /> 
                                            </a>
                                        )}
                                        </>
                                        }
                                       
                                        <div title="Copy URL" onClick={() => {
                                            navigator.clipboard.writeText(blogURL);
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 3000);
                                        }} data-aos="zoom-in"
                data-aos-delay="600" >
                                            <BsCopy /> {copied && 'Copied!'}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Project Content */}
                                <h1  data-aos="fade-up"
            data-aos-delay="250" style={{ color: "var(--main-site-color)", fontSize: '28px', textTransform: 'capitalize' }}>
                                    {blogData.project.title}
                                </h1>
                                
                                <div className="flex gap-3 w-100 flex-wrap" data-aos="fade-up"
            data-aos-delay="300">
                                    <h5 className="hh">Category: <span>{blogData.project.projectcategory}</span></h5>
                                    <h5 className="hh">Platforms: <span>{blogData.project.platforms?.join(", ")}</span></h5>
                                    {blogData.project.projectYear && (
                                        <h5 className="hh">Year: <span>{blogData.project.projectYear}</span></h5>
                                    )}
                                </div>
                                
                                <h5 className="hh flex gap-2" data-aos="fade-up"
            data-aos-delay="350">Technologies:
                                    <div className="tech-tags">
                                        {blogData.project.technologies?.map((tech, index) => (
                                            <span key={index} data-aos="zoom-in"
                  data-aos-delay={400 + (index * 50)} >{tech}</span>
                                        ))}
                                    </div>
                                </h5>
                                
                                {/* Project Description */}
                                <div className="blogcontent" data-aos="fade-up"
            data-aos-delay="400">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {blogData.project.description}
                                    </ReactMarkdown>
                                </div>
                                
                                {/* Testimonials Section */}
                                {blogData.review?.length > 0 && (
                                    <div className="blogusecomments" data-aos="fade-up"
              data-aos-delay="450" style={{marginTop:'-1rem'}} ref={commentRef}>
                                        <h2>Testimonials</h2>
                                        {RenderComments()}
                                    </div>
                                )}
                                
                                {/* Submit Testimonial Form */}
                                <div className="blogslugcomments" data-aos="fade-up"
            data-aos-delay="500" ref={replyformRef}>
                                    <h2>Submit a Testimonial</h2>
                                    <p>Required info are marked by *. Note your Email is securely hidden and is needed to delete</p>
                                    <form className="leaveareplyform" onSubmit={handleReviewSubmit}>
              <div 
                className="nameemailcomment"
                data-aos="fade-up"
                data-aos-delay="550"
              >
                <input 
                  type="text"
                  value={NewReview.name}
                  required
                  onChange={(e) => setNewReview({...NewReview, name: e.target.value})}
                  placeholder="Enter Your Name *" 
                />
                <input 
                  type="email"
                  value={NewReview.email}
                  required
                  onChange={(e) => setNewReview({...NewReview, email: e.target.value})}
                  placeholder="Enter Your Email Address *" 
                />
              </div>
              <div 
                className="nameemailcomment"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <select
                  name="role"
                  required
                  style={{ color: !NewReview.role ? 'rgba(255,255,255, 0.4)' : '#fff' }}
                  value={NewReview.role}
                  onChange={(e) => setNewReview({...NewReview, role: e.target.value})}
                >
                  <option value="">Select your role *</option>
                  <option value="Client">Client (Customer)</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Colleague">Colleague (Teammate)</option>
                  <option value="Partner">Partner</option>
                  <option value="Professor">Professor</option>
                  <option value="Other">Other</option>
                </select>
                <select
                  id="rating"
                  name="rating"
                  value={NewReview.rating}
                  required
                  style={{ color: !NewReview.rating ? 'rgba(255,255,255, 0.4)' : '#fff' }}
                  onChange={(e) => setNewReview({...NewReview, rating: e.target.value})}
                >
                  <option value="">Rate this project</option>
                  {["⭐⭐⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐", "⭐⭐", "⭐"].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div 
                className="nameemailcomment"
                data-aos="fade-up"
                data-aos-delay="650"
              >
                <input 
                  type="text"
                  value={NewReview.company}
                  onChange={(e) => setNewReview({...NewReview, company: e.target.value})}
                  placeholder="Your Company / organization (optional)" 
                />
                <input 
                  type="text"
                  value={NewReview.website}
                  onChange={(e) => setNewReview({...NewReview, website: e.target.value})}
                  placeholder="Your Website / LinkedIn (optional)" 
                />
              </div>
              <textarea 
                rows={4} 
                value={NewReview.message}
                required
                onChange={(e) => setNewReview({...NewReview, message: e.target.value})}
                style={{ resize: 'none' }} 
                placeholder="Write Your Testimonial Here *" 
                data-aos="fade-up"
                data-aos-delay="700"
              />
              <div 
                className="flex gap-2"
                data-aos="fade-up"
                data-aos-delay="750"
              >
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={NewReview.consent}
                  style={{ width: '20px', height: '20px' }}
                  onChange={(e) => setNewReview({...NewReview, consent: e.target.checked})}
                />
                <label htmlFor="consent" className="w-100">
                  I give permission for my testimonial to be displayed on this website.
                </label>
              </div>
              <div 
                className="flex gap-2"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <button 
                  type="submit" 
                  disabled={!NewReview.consent}
                  style={!NewReview.consent ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                >
                  Submit
                </button>
                {messageOk && (
                  <p style={{ 
                    color: messageOk.includes('✅') ? 'var(--main-site-color)' : 'red',
                    padding: '1rem',
                    background: 'var(--box-shadow)'
                  }}>
                    {messageOk}
                  </p>
                )}
              </div>
            </form>
                                </div>
                            </div>
                            
                            {/* Right Sidebar */}
                           <div className="rightsitedetails">
          <div 
            className="rightslugsearchbar"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <input 
              type="text" 
              placeholder="Search project here..." 
              onClick={() => setSearchInput(true)}
            />
            <button><IoSearch /></button>
          </div>

          <div 
            className="rightslugcategory"
            data-aos="fade-left"
            data-aos-delay="250"
          >
            <h2>CATEGORIES</h2>
            <ul>
              {Object.entries(likeCounts).map(([category, count], index) => (
                <Link href={`/projects/category/${category}`}>
                  <li 
                    key={category}
                    data-aos="fade-left"
                    data-aos-delay={300 + (index * 50)}
                  >
                    {category}
                    <span>({count > 9 ? count : '0'+count})</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          
          <div 
            className="rightrecentpost proje"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <h2>View This (scroll up) </h2>
            <div className="subrightrecentpost">
              {filterProjects.length === 0 ? (
                <p style={{ color: 'var(--primary-color)' }}>No Current Projects</p>
              ) : (
                <Swiper
                  direction="vertical"
                  slidesPerView="auto"
                  spaceBetween={20}
                  freeMode={true}
                  grabCursor={true}
                  loop={true}
                  autoplay={{
                    delay: 1,
                    disableOnInteraction: false,
                    reverseDirection: false,
                  }}
                  speed={3000}
                  modules={[FreeMode, Autoplay]}
                  className="mySwiper"
                >
                  {filterProjects.map((project, index) => (
                    <SwiperSlide 
                      key={project._id} 
                      className="rightrecentp"
                      data-aos="zoom-in"
                      data-aos-delay={350 + (index * 50)}
                    >
                      <Link href={`/projects/${project.slug}`}>
                        <img src={project.images[0]} alt={project.title} />
                        <Link href={`/projects/${project.slug}`} className="projde">
                          <h2>{project.title}</h2>
                        </Link>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </div>
                        
                        {/* Delete Confirmation Modal */}
                       {delet && (
        <div 
          className="deleteForm"
          data-aos="zoom-in"
        >
          <div className="deleteFormBox">
            <form className="leaveareplyform" onSubmit={HandleDeletForm}>
              <h3><div className="flex flex-center gap-1"><IoWarning />Confirm Delete</div></h3>
              <li><IoWarning /> Only the person who posted this testimonial can Delete</li>
              <li><IoWarning />By deleting, all replied comments are also deleted</li>
              <li><IoWarning />This action cannot be undone</li>
              <li>Use the email used to publish this testimonial</li>
              <div 
                className="clostbn" 
                onClick={() => setDelet(false)}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <FaX />
              </div>
              <div 
                className="nameemailcomment"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <input 
                  type="email"
                  value={deleteEmail}
                  onChange={(e) => setDeleteEmail(e.target.value)}
                  placeholder="Enter Your Email Address" 
                />
              </div>
              <div 
                className="flex gap-2"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <button type="submit">Delete</button>
                <p style={{ color: 'red' }}>{messageOk}</p>
              </div>
            </form>
          </div>
        </div>
      )}
                        
                        {/* Search Modal */}
                        {searchInput && <Projectsearch cls={() => setSearchInput(false)} />}
                    </div>
                )}
            </div>
             {
                          (addedToCart ||  (saveCart&& JSON.parse(saveCart).some(ab => ab._id == blogData.project._id)))  &&  <button 
      onClick={() => window.open(`/projects/category/${blogData.project.projectcategory}#cart`, '_self')}
      title="view cart"
      className="back-to-top cart"
      aria-label="Back to top"
      data-aos="fade-up"
      data-aos-delay="500"
    >
      <FaCartShopping size={20} />
      <span>{JSON.parse(saveCart).length}</span>
    </button>
                            }
        </>
    );
};

export default ProjectSlug;