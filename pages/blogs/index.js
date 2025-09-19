import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, FreeMode } from 'swiper/modules';
import Head from 'next/head';
import { FaSearch } from 'react-icons/fa';
import useFetchData from '@/hooks/useFetchData';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import Blogsearch from '@/components/Blogsearch';
import toast from 'react-hot-toast';

export default function blogs() {

        const [currP, setCurrP] = useState(1);
     const [pagePage] = useState(3)
        const [currP1, setCurrP1] = useState(1);
     const [pagePage1] = useState(2)
       const [length, setLength] = useState(0)
 // const [length, setLength] = useState(0)
    const [index, setIndex] = useState(0);

 
    const [searchQ, setSearchQ] = useState('');
      const [refresh, setRefresh] = useState(false);
      const {alldata, loading} = useFetchData('/api/blogs');
      const [alldata1, SetAllData1] = useState([]);
      const [BlogAllData, setBlogAllData] = useState(alldata);
       const [searchInput, setSearchInput] = useState(false)
       
       const handleSearchOpen = () =>{
           setSearchInput(!searchInput);
       }
       const handleSearchClose = () =>{
           setSearchInput(false);
       }
      const paginate = (pageNum) =>{
           setCurrP(pageNum)
      };
      const paginate1 = (pageNum) =>{
           setCurrP1(pageNum)
      };
        useEffect(() => {
             sliderpubdata.length
//setLength(blog.images.length)
                  const interval = setInterval(() => {
          console.log("bloglength", sliderpubdata.length)
          setIndex((prev) => (prev + 1) % 3);
          console.log("index", index)
      }, 4000);
  
      return () => clearInterval(interval)
            
     
  
  },[index])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const reviewResponse = await fetch('/api/comment');
          const Data = await reviewResponse.json();
          console.log("Data", Data);
          SetAllData1(Data);
        } catch (error) {
          toast.error(error);
        }
      };
      fetchData();
    }, []);
  const router = useRouter();
      const [isDelete, setDelete] = useState(false);
      const [productInfo, setProductInfo] = useState(null);
      


      async function chooseDel(id) {
         axios.get('/api/blogs?id=' + id).then(res => {
             console.log("id", id, "res", res);
             setProductInfo(res.data.data )
           })
           console.log("productInfo", productInfo);
           setRefresh(true);
           setDelete(true)
      }
      function goBack() {
        console.log("BlogAllData", BlogAllData)
         setRefresh(!refresh);
         setDelete(false);
        router.push('/blogs/process1');
         
     }
     async function deletBlog(id) {
         console.log("delete id", id)
         await axios.post("/api/blogs", {blogId: id}).then(res => {
             setBlogAllData(alldata);
         });
             goBack()
        //  return Loading()
     }
      const allBlogs = alldata.length
      const filterBlog = searchQ.trim() === '' ? alldata : alldata.filter(blog => blog.title.toLowerCase().includes(searchQ.toLowerCase()) )
 
      const indexfirstString = (currP - 1) * pagePage;
     const indexlastString = currP * pagePage;
     const curreBlogs = filterBlog.slice(indexfirstString, indexlastString)
    const publishedData = curreBlogs.filter(ab => ab.status === 'publish' )
    const sliderpubdata = alldata.filter(ab => ab.status === 'publish')
    const pageNum = [];
    for (let index = 1; index <= Math.ceil(allBlogs/pagePage); index++) {
       pageNum.push(index);  
        
    }

      const pageNum1 = [];
  const allComments = alldata1.length;
  const indexfirstString1 = (currP1 - 1) * pagePage1;
  const indexlastString1 = currP1 * pagePage1;
  const curreproject = alldata1.slice(indexfirstString1, indexlastString1);
  
  for (let i = 1; i <= Math.floor(allComments/pagePage1); i++) {
    pageNum1.push(i);
  }
              const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
       const handleMouseMove = (e) => {
        setGlowPosition({
          x: e.clientX,
          y: e.clientY
        });
      };
     const extractFirstParagraph = (markdown, max, min) => {
    // Split markdown by double newline to separate paragraphs
    const paragraphs = markdown.split('\n\n')
    
    // Return the first paragraph (assuming paragraphs[0] is the first paragraph)
    if (paragraphs[0].length  > max) {
        return `${paragraphs[0].slice(0, min)}...`;
    }
    else{
        return paragraphs[0];
    }
   // return .slice(0, 180);
};
    

    return <>
        <Head>
            <title>MYG Tech - Blogs</title>
        </Head>
        <div className="blogpage">
  <section 
    className="tophero" 
    onMouseMove={handleMouseMove}
    data-aos="fade"
    data-aos-duration="1000"
  >
    <div className="container">
      <section 
        className="toptitle" 
        onMouseMove={handleMouseMove}
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <div 
          className="footer-glow"
          style={{
            left: `${glowPosition.x}px`,
            top: `${glowPosition.y}px`,
          }}
        ></div>
        <div className="toptitlecont flex">
          <h1 data-aos="fade-right" data-aos-delay="300">
            Welcome to <span data-aos="fade-left" data-aos-delay="400">MYG Tech Blogs</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="500">
            I write about web, mobile development and modern javascript frameworks.
            The best articles, links and news related to web and mobile development
          </p>
          
          <div className='subemail' data-aos="zoom-in" data-aos-delay="600">
            <form className='flex'  data-aos="fade-right"
                data-aos-delay="700">
              <input 
                onClick={handleSearchOpen} 
                type='text' 
                placeholder='Search blog here' 
               
              />
              <button>
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section 
        className='featured'
        onMouseMove={handleMouseMove}
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div 
          className="footer-glow"
          style={{
            left: `${glowPosition.x}px`,
            top: `${glowPosition.y}px`,
          }}
        ></div>
        <div className='container'>
          <div 
            className='border'
            data-aos="zoom-in"
            data-aos-delay="400"
          ></div>
          
          <div className='featuredposts latestpostsdata'>
            <div 
              className='fetitle flex'
              data-aos="fade-right"
              data-aos-delay="500"
            >
              <h3>Featured Posts: </h3>
            </div>
            <div 
              className='feposts flex'
              data-aos="fade-up"
              data-aos-delay="600"
            >
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
                {
                  loading  && sliderpubdata.length === 0 ? <div className='flex flex-center wh_50'>
                    <Spinner />
                  </div>
                  :
                  <>
                    {
                    !loading  && sliderpubdata.length > 0 && sliderpubdata.slice(0,6).map((blog) => (
                        <SwiperSlide 
                          key={blog._id}
                          data-aos="zoom-in"
                          data-aos-delay={100 * index}
                        >
                          <div className='fpost' key={blog._id}>
                            <Link href={`/blogs/${blog.slug}`}>
                              <img 
                                src={blog.images[index]} 
                                alt={blog.title} 
                                data-aos="fade-up"
                              />
                            </Link>

                            <div 
                              className='tegs flex'
                              data-aos="fade-up"
                              data-aos-delay="100"
                            >
                              <Link 
                                    href={`/blogs/category/${blog.blogcategory}`} 
                                    className='vr'
                                    data-aos="flip-left"
                                    data-aos-delay={150 * index}
                                  >
                                    <span className='ai'></span>{blog.blogcategory}
                                  </Link> 
                               
                            </div>

                            <div className='fpostinfo'>
                              <h2>
                                <Link 
                                  style={{fontSize:'14px', fontWeight: '400'}} 
                                  href={`/blogs/${blog.slug}`}
                                  data-aos="fade-up"
                                  data-aos-delay="200"
                                >
                                  {extractFirstParagraph(blog.title, 45, 40)}
                                </Link>
                              </h2>
                              <div 
                                className='fpostby flex'
                                data-aos="fade-up"
                                data-aos-delay="250"
                              >
                                <img src='/img/coder.jpg' />
                                <p>By MYG Tech</p>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>)
                      )
                    }
                    {
                         !loading  && sliderpubdata.length === 0 && <h3 
        className="w-100 flex flex-center mt-3"
        data-aos="fade-up"
      >
        No Testimonials Found
      </h3>
                    }
                  </>
                }
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>

    <section 
    className="services-page__testimonials" 
    onMouseMove={handleMouseMove}
    data-aos="fade-up"
  >
    <div 
      className="footer-glow" 
      style={{ left: `${glowPosition.x}px`, top: `${glowPosition.y}px` }}
    ></div>
    
    <div className="sp__section-header latestpostsdata">
      <h2 
        className="sp__section-title"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Latest Comment
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
      <h3 
        className="w-100 flex flex-center mt-3"
        data-aos="fade-up"
      >
        No Testimonials Found
      </h3>
    )}

    <div 
      className="flex gap-2" 
      style={{alignItems: 'center'}}
      data-aos="zoom-in"
    >
      {curreproject.map((test, index) => (
        <div 
          className="services-page__testimonial" 
          key={test.id}
          data-aos="flip-up"
          data-aos-delay={index * 100}
        >
          <p 
            className="services-page__testimonial-text"
            data-aos="fade-up"
          >
            {extractFirstParagraph(test.contentPera)}
          </p>
          <div 
            className="services-page__testimonial-author"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img 
              src={test.image} 
              alt={test.name}
              className="services-page__testimonial-avatar"
              data-aos="zoom-in"
            />
            <div className="services-page__testimonial-info">
              <h4 
                className="services-page__testimonial-name"
                data-aos="fade-right"
              >
                {test.name}
              </h4>
              <p 
                className="services-page__testimonial-role"
                data-aos="fade-left"
              >
                Blog: <a>{test.blogTitle}</a>
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
        {pageNum1.slice(Math.max(currP1 - 3, 0), Math.min(currP1 + 2, pageNum1.length)).map(num => (
          <button 
            key={num} 
            onClick={() => paginate1(num)}
            className={`${currP1 === num ? 'active' : ''}`}
            data-aos="zoom-in"
            data-aos-delay={100 * num}
          >
            {num}
          </button>
        ))}
      </div>
    )}
  </section>

  <section 
    className='latestpostssec m-0' 
    onMouseMove={handleMouseMove}
    data-aos="fade-up"
  >
    <div 
      className="footer-glow"
      style={{
        left: `${glowPosition.x}px`,
        top: `${glowPosition.y}px`,
      }}
    ></div>
    <div className='container'>
      <div className='latestpostsdata'>
        <div 
          className='fetitle'
          data-aos="fade-right"
        >
          <h3>Latest Articles:</h3>
        </div>
        {
          loading ? <div className='flex flex-center wh_50'>
            <Spinner />
          </div>
          : 
          <div 
            className='latestposts'
            data-aos="fade-up"
          >
            {
              publishedData.map((blog, index) => {
                return <div 
                  key={blog._id} 
                  className='lpost'
                  data-aos="flip-up"
                  data-aos-delay={100 * (index % 3)}
                >
                  <div className='lpostimg'>
                    <Link href={`/blogs/${blog.slug}`}>
                      <img 
                        src={blog.images[index]} 
                        alt={blog.title}
                        data-aos="zoom-in"
                      />
                    </Link>
                    <a 
                      className='link' 
                      href={`/blogs/category/${blog.blogcategory}`}
                      data-aos="fade-right"
                    >
                      {blog.blogcategory}
                    </a>
                  </div>

                  <div className='lpostinfo'>
                    <h3>
                      <Link 
                        href={`/blogs/${blog.slug}`}
                        data-aos="fade-up"
                      >
                        {extractFirstParagraph(blog.title, 30, 20)}
                      </Link>
                    </h3>
                    <p data-aos="fade-up">{blog.description}</p>
                    <h4 
                      className='fpostby flex'
                      data-aos="fade-up"
                    >
                      <img src='/img/coder.jpg' alt='makirow' />
                      <span>By MYG Tech</span>
                    </h4>
                  </div>
                </div>
              })
            }
          </div>
        }
      </div>

      {
        publishedData.length === 0 ? ("") : (
          <div 
            className="blogspaginationbtn flex flex-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <button 
              onClick={() => paginate(currP - 1)} 
              disabled={currP === 1}
              data-aos="fade-right"
            >
              <IoChevronBack style={{fontSize: '20'}} />
            </button>
            {
              pageNum.slice(Math.max(currP - 3, 0), Math.min(currP + 2, pageNum.length)).map(num => (
                <button 
                  key={num} 
                  onClick={() => paginate(num)}
                  className={`${currP === num ? 'active' : ''}`}
                  data-aos="zoom-in"
                  data-aos-delay={100 * num}
                >
                  {num}
                </button>
              ))
            }
            <button 
              onClick={() => paginate(currP + 1)} 
              disabled={curreBlogs.length < pagePage}
              data-aos="fade-left"
            >
              <IoChevronForward style={{fontSize: '20'}} />
            </button>
          </div>
        ) 
      }
    </div>
  </section>



  {searchInput && <Blogsearch cls={handleSearchClose} />}
</div>
    </>
}