import Blogsearch from '@/components/Blogsearch';
import Spinner from '@/components/Spinner';
import useFetchData from '@/hooks/useFetchData';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';


export default function Category() {

const router = useRouter();
    const {category} = router.query;
          const [currP, setCurrP] = useState(1);
         const [pagePage] = useState(6)
           const [length, setLength] = useState(0)

  const {alldata, loading} = useFetchData(`/api/blogs?blogcategory=${category}`);
   
   // console.log("alldata", alldata);

        const [error, seterror] = useState(null)
        const [index, setindex] = useState(0)
        const [copied, setCopied] = useState(false)
         const [messageOk, setmessageOk] = useState('')


               const allBlogs = alldata.length
      const filterBlog = alldata.filter(blog => blog.category === blog.category).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 20);
 
     const publishedData = [...filterBlog].filter(ab => ab.status === 'publish').reverse();
      const paginate = (pageNum) =>{
           setCurrP(pageNum)
      };
     const indexfirstString = (currP - 1) * pagePage;
     const indexlastString = currP * pagePage;
     const curreBlogs = publishedData.slice(indexfirstString, indexlastString)
    const sliderpubdata = alldata.filter(ab => ab.status === 'publish')
    const pageNum = [];
    for (let index = 1; index <= Math.ceil(allBlogs/pagePage); index++) {
       pageNum.push(index);  
        
    }

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

    useEffect(() => {
        const interval = setInterval(() => {
            const bloglength = 3 
            console.log("bloglength", bloglength)
            setindex((prev) => (prev + 1) % bloglength);
            console.log("index", index)
        }, 4000);
    
        return () => clearInterval(interval)
    
    },[index])
 const [searchInput, setSearchInput] = useState(false)
    const handleSearchOpen = () =>{
           setSearchInput(!searchInput);
       }
       const handleSearchClose = () =>{
           setSearchInput(false);
       }


    return <>
        <Head>
            <title>Blog category page</title>
        </Head>
        <div className="blogcategory">
 <section className="tophero"  style={{
                        background: `linear-gradient(135deg, rgba(0, 0, 255, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%), url(${'https://picsum.photos/1920/1080?random=199'})`,
                        backgroundSize: 'cover',
                        height: '100vh',
                        backgroundPosition: 'bottom',
                        backgroundRepeat: 'no-repeat',
                        overflow: 'hidden'
                    }} >
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
                  </section>
                  
<section className='latestpostssec'>
   <div className='container'>
       <div className='border'></div>

         <div className='latestpostsdata'>
               <div className='fetitle'>
                   <h3>{category} Articles:</h3>
               </div>
               <div className='latestposts'>
                   
                   {
                    loading ? <Spinner />
                     : 
                     <>
                     {
                        curreBlogs.map((blog) => {
                            return <div key={blog._id} className='lpost'>
                                         <div className='lpostimg'>
                                             <Link href={`/blogs/${blog.slug}`}>
                                             <img src={blog.images[index]} alt={blog.title}/>
                                             </Link>
                   </div>

                                         <div className='lpostinfo'>
                                              <h3><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h3>
                                              <p> {blog.description} </p>
                                         <h4 className='flex'>
                                                 <img src='/img/coder.jpg' alt='makirow'  />
                                                 <span>By MYG Tech</span>
                                         </h4>
                                         </div>
                                        
                                </div>
                        })
                     }
                     </>
                   }
               
               </div>
               
         </div>

         {
                        curreBlogs.length === 0 ? ("") : (
                            <div className="blogspaginationbtn flex flex-center">
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

<button onClick={() => paginate(currP + 1)} disabled={ curreBlogs.length < pagePage}><IoChevronForward style={{fontSize: '20'}} /></button>
                            </div>
                        ) 
                     }
   </div>
</section>

 {
                    searchInput ? <Blogsearch cls={handleSearchClose} /> : null
                }

        </div>
    </>
}