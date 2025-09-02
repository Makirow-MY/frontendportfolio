import { CiCalendar, CiRead } from "react-icons/ci";
import { RiCalendarEventFill, RiFacebookFill, RiH4 } from "react-icons/ri";
import { FaEdit, FaSearch, FaTwitter } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
//import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { FaCalendar, FaFacebook, FaHandPointDown, FaLinkedin, FaReply, FaX } from "react-icons/fa6";
import { IoArrowBack, IoArrowForward, IoCalendar, IoCalendarOutline, IoChevronBack, IoChevronForward, IoNotificationsCircle, IoSearch, IoSearchOutline, IoTrash, IoWarning } from "react-icons/io5";
import Blogsearch from "@/components/Blogsearch";
//import { a11yLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

// pages/blogs/[slug].js
// Function to shuffle array randomly (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};



const BlogPage = () => {


    const router = useRouter();
    const {slug} = router.query;
    const {alldata} = useFetchData('/api/blogs')
    const [loading, setLoading] = useState(true)
    const [error, seterror] = useState(null)
    const [length, setLength] = useState(1)
    const [index, setindex] = useState(0)
    const [copied, setCopied] = useState(false)
     const [messageOk, setmessageOk] = useState('')
     const replyformRef = useRef(null)
const commentRef = useRef(null)
const filterProj =  alldata.filter((ab) => slug === ab.slug)
    const [blogData, setBlogData] = useState({
        blog: {},
        comments: []
    })
    const [NewComm, setNewComm] = useState({
        title: '',
        name: '',
        email: '',
        image: '',
        contentPera: '',
        mainComment: true,
        parent: null,
        parentName:'',
        parentImage: '',
    })
    const [delet, setDelet] = useState(false)
    const [deleteEmail, setDeleteEmail] = useState("");
    const [searchInput, setSearchInput] = useState(false)
     const [likeCounts, setLikeCounts] = useState({});
     const [displayedPosts, setDisplayedPosts] = useState([]);

  useEffect(() => {
    // Initial shuffle and display
    const updatePosts = () => {
      if (alldata && alldata.length > 0) {
        const filteredPosts = alldata.filter(ab => ab.slug !== slug);
        const shuffledPosts = shuffleArray(filteredPosts).slice(0, 5);
        setDisplayedPosts(shuffledPosts);
      }
    };

    // Run immediately on mount or when alldata/slug changes
    updatePosts();

    // Set interval to reshuffle every 60 seconds
    const interval = setInterval(updatePosts, 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [alldata, slug]);

useEffect(() => {
    const countLikes = () => {
      const counts = {};
      alldata.forEach(blog => {
        blog.blogcategory.forEach(category => {
          counts[category] = (counts[category] || 0) + 1;
        });
      });
      setLikeCounts(counts);
    };

    if (alldata.length > 0) {
      countLikes();
    }
  }, [alldata]);

useEffect( () => {

    const fetchData = async () =>{

         if (slug) {
        try {
          const response = await axios.get(`/api/blogs/${slug}`) 
        setBlogData(response.data)
        setLength(blogData && blogData.blog.images.length)
        } catch (error) {
            toast.dismiss()
            console.error("Something went wrong while fetching data, try again", error)
        }
        finally{
            setLoading(false)
        }
     }

    }
    fetchData();

}, [slug, commentRef.current,  delet, blogData.comments])

useEffect(() => {
    const interval = setInterval(() => {
        const bloglength = !filterProj[0]?.images.length ? 3 : filterProj[0].images.length  
      //  console.log("bloglength", filterProj[0].images.length)
        setindex((prev) => (prev + 1) % bloglength);
        if (index == NaN) {
            setindex(filterProj[0].images.length - 1)
        }
    }, 3000);

    return () => clearInterval(interval)

},[index])

const handleSearchOpen = () =>{
    setSearchInput(!searchInput);
}
const handleSearchClose = () =>{
    setSearchInput(false);
}
const [currentIndex, setCurrentIndex] = useState(0);
          const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
   const handleMouseMove = (e) => {
    setGlowPosition({
      x: e.clientX,
      y: e.clientY
    });
  };
const HandleDeletForm = async(e) =>{
e.preventDefault();

if (deleteEmail === '') {
   
    toast.error("Email must be provided inoder to delet post")
}
else{
    if (slug) {
      try {
         const response = await axios.post(`/api/blogs/${slug}`,  {commentId: NewComm.parent,
            commentmainComment: NewComm.mainComment,
            deleteEmail: deleteEmail
          }); 

         setNewComm({
        ...NewComm,
        parent: null,
        title:'',
        parentImage: '',
        parentName:'',
        mainComment: true,
    })
    setDelet(false)
    setDeleteEmail('')
    if (commentRef.current) {
        commentRef.current.scrollIntoView({
            behavior: 'smooth'
        })
    }
    toast.success("✅Comment Deleted Successfully")
      } catch (error) {
         // console.log(error)
           toast.error("Incorrect Email. Only the sender can delete post",)
      }  
    }
}
}
const prevpro = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? blogData.blog?.images.length - 1 : prevIndex - 1
    );
  };

    const nextpro = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === blogData.blog?.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
 useEffect(() => {
    if ( blogData  && blogData.blog.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) =>  (prev + 1) % blogData.blog.images.length
       //   prevIndex === blogData.blog?.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [blogData.blog?.images]);

    // useEffect(() => {
    //       if (blogData.blog.images.length > 1) {
    //           const interval = setInterval(() => {
    //               setCurrentIndex((prev) => (prev + 1) % blogData.blog.images.length);
    //           }, 3000);
    //           return () => clearInterval(interval);
    //       }
    //   }, [blogData.blog?.images]);

const handleCommentSubmit = async (e) =>{
    e.preventDefault();

    if (NewComm.name === '' || NewComm.email === '' || NewComm.contentPera === '') {
        toast.error("Please Provide All Information")
    } else {

    setNewComm({...NewComm, 
        image: `https://ui-avatars.com/api/?name=${NewComm.name}&background=random`})
        
try {
        const response = await axios.post(`/api/blogs/${slug}`,  NewComm);
        if (NewComm.parent) {
               setBlogData(prev =>  {
           
                const updateComm =  prev.comments.map(com =>{
                       if (com._id === NewComm.parent) {
                             return {
                                  ...com,
                                  children: [...com.children, response.data]
                             }
                       }
                       else if (com.children &&  com.children.length > 0) {
                             return {
                                ...com,
                                children: updateChildrenComments(com.children, NewComm.parent, response.data)
                             }
                       }

                       return com;
               });

                    return {
                        ...prev,
                        comments: updateComm
                    }
                  
               })
        } else {
            setBlogData(prev =>({
                ...prev,
                comments: [response.data, ...prev.comments]
            }))
        }

        toast.success("✅ Comment posted successfully");
         if (commentRef.current) {
        commentRef.current.scrollIntoView({
            behavior: 'smooth'
        })
    }
        setNewComm({
        title: '',
        name: '',
        email: '',
        image: '',
        contentPera: '',
       mainComment: true,
        parent: null,
        parentName:'',
        parentImage: '',
        })
         setmessageOk("✅ Comment published successfully");
                    toast.success("✅ Comment published successfully");
                    setTimeout(() => setmessageOk(''), 3000);
    } catch (error) {
      //  console.error(error)
        toast.error("❌ Failed To Post Comment", error)
    }

    }
    
}



const handleReply = (parentId, parentName, parentImage) =>{
    setNewComm({
        ...NewComm,
        parent: parentId,
        parentImage: parentImage,
        parentName: parentName,
        mainComment: false,
    })

    if (replyformRef.current) {
        replyformRef.current.scrollIntoView({
            behavior: 'smooth'
        })
    }
}
const handleDelet = (parentid, parentTitle,ParentmainComment) => {
          setNewComm({
        ...NewComm,
        parent: parentid,
        title: parentTitle,
        mainComment: ParentmainComment,
    })   
    
    setDelet(true)

}
const handleRemoveReply = () =>{
    setNewComm({
        ...NewComm,
        parent: null,
        title:'',
        parentImage: '',
        parentName:'',
        mainComment: true,
    })
    setDelet(false)
    setDeleteEmail('')
}
const updateChildrenComments = (comments, parentId, newComment) =>{
     return comments.map(comment => {
          if (comment._id === parentId) {
               return {
                ...comment,
                children: [...comment.children, newComment]
               }
          } else if(comment.children && comment.children.length > 0){
                 return {
                ...comment,
                children: updateChildrenComments(comment.children, parentId ,newComment)
               }
          }

          return comment;
     })
}
const [commentView, setcommentView] = useState('recent'); // 'top', 'recent', 'oldest'
    const [commentPage, setcommentPage] = useState(1);

    
 const getPaginatedComent = (comments) => {
        let sortedComent = [...comments];
        
        // Sort based on selected view
        switch (commentView) {
            case 'top':
                sortedComent.sort((a, b) => b.children.length - a.children.length);
                break;
            case 'oldest':
                sortedComent.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'recent':
            default:
                sortedComent.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
        }
        
        // Filter only consented Coment
        //const consentedComent = sortedComent.filter(review => review.consent);
        
        // Paginate results (5 per page)
        const startIndex = (commentPage - 1) * 3;
        return sortedComent.filter(comment =>  comment.mainComment).slice(startIndex, startIndex + 3);
    };
 const [view, setView] = useState(false)
 const [viewID, setViewID] = useState(null)
    const comments = getPaginatedComent(blogData.comments.filter(comment =>  comment.mainComment));
    const totalcomments = blogData.comments.filter(comment =>  comment.mainComment).length ;
    const hasNextPage = comments.length === 3 && (commentPage * 3) < totalcomments;
    const hasPreviousPage = commentPage > 1;

if (loading) {
    return <div className="wh_100 flex flex-center"><Spinner/></div>
}
if (error) {
    return <p>Error: {error}</p>
}

const createdAtDate = blogData && blogData.blog.createdAt ? new Date(blogData && blogData.blog.createdAt) :  null

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

const blogURL = `http://localhost:3000/${slug}`
const handleCopy  = (url) =>{
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
        setCopied(false)
    }, 3000);
}

const RenderComments = (comments) =>{

   
      if (!comments) {
          return null;
      }

      const commentMap = new Map();
      comments.forEach(comment => {
             if (comment.mainComment) {
                 commentMap.set(comment._id, [])
             }
      });

       comments.forEach(comment => {
             if (!comment.mainComment &&  comment.parent) {
                     if (commentMap.has(comment.parent)) {
                           commentMap.get(comment.parent).push(comment)
                     }

                       //  console.log("data user comments", comments, "commentMap", commentMap)
                
             }
      });

     return (
      <>

      <div className="comment-controls" data-aos="fade-down">
                     <div className="view-options">
                    <button 
                        className={commentView == 'recent' ? 'active' : ''}
                        onClick={() => {
                            setcommentView('recent');
                            setcommentPage(1); // Reset to first page when changing view
                        }}
                    >
                        Recent
                    </button>
                   
                    <button 
                        className={commentView === 'oldest' ? 'active' : ''}
                        onClick={() => {
                            setcommentView('oldest');
                            setcommentPage(1);
                        }}
                    >
                        Oldest
                    </button>
                </div>
                </div>

      {
         getPaginatedComent(comments).map(parentCom => (
            <div className="blogcomment" key={parentCom._id}  >
 <div className="blogdiv">

 <div className="flex flex-sb">
                <div className="flex gap-1 w-100" style={{alignItems:'center', display:'flex'}}>
                    <img  src={parentCom.image} alt={parentCom.name} />
                 
                                <div className="subhead">
                            <h3>{parentCom.name}</h3>
                            <h4>{new Date(parentCom.createdAt).toLocaleString()}</h4>
                    </div>
                    
                </div>

                 <div className="flex gap-1 w-50">
                     
                      <button title="Reply To Post" className="modbtn" onClick={() => handleReply(parentCom._id, parentCom.name, parentCom.image)}> <FaReply style={{ marginLeft:'5px'}} /> </button>
                     <button title="Delete post" className="modbtn" onClick={() => handleDelet(parentCom._id, parentCom.title, parentCom.mainComment)}><IoTrash /> </button>
                </div>

                </div>

                   <h4 className="text-left   style={{padding: 0, margin: 0, marginTop: '-5px'}}tit"> <b>{parentCom.title}</b></h4>
                <p className="pae" style={{fontWeight:'300', padding: 0,}}>{parentCom.contentPera}</p>
               
               
                    {
                    parentCom.parent && (
                        <span className="repliedto"> {commentMap.get(parentCom._id).length > 0 ? `(${commentMap.get(parentCom._id).length}) Reply` : `Reply`} Reply To {parentCom.parentName}</span>
                    )
                    }
                   
                   {
                     (!view || !viewID) && <span className="repliedto mt-1" onClick={() => {setView(true);
                      setViewID(parentCom._id)
                     }} style={{color: "var(--main-site-color)"}}>  {commentMap.get(parentCom._id).length > 0 ? `(${commentMap.get(parentCom._id).length}) Replies` : ``} </span>
                    } 
</div>
{
  (view && viewID == parentCom._id) &&  <div className="children-comments">
                      
                      <div className="flex gap-1">
                          <button title="Delete post" onClick={() => {setView(true);
                      setViewID(null)
                     }}  className="modbtn"><IoArrowBack /> </button>
                          <span className="" style={{color: "var(--main-site-color)"}}>  {commentMap.get(parentCom._id).length > 0 ? `(${commentMap.get(parentCom._id).length}) Replies To ${parentCom.name}` : ``} </span>
                   
                      </div>
                            {
                            commentMap.get(parentCom._id).map(childeComm =>(
                                <div className="child-comment" key={childeComm._id}>
<div className="flex flex-sb">
                                           <div className="flex gap-1 w-100" style={{ paddingBottom: '1rem',alignItems:'center', display:'flex'}}>
                    <img  src={childeComm.image} alt={childeComm.name} />
                    <div className="subhead">
                            <h3>{childeComm.name}</h3>
                            <h4>{new Date(childeComm.createdAt).toLocaleString()}</h4>
                            
                    </div>
                    
                </div>
                 <div className="flex gap-1">
                     <button title="Delete post" className="modbtn" onClick={() => handleDelet(childeComm._id, childeComm.title, childeComm.mainComment)}><IoTrash /> </button>
                </div>

</div>
                <h4 className="text-left"  style={{ marginTop: '-15px', paddingTop: '0'}}> <b>{childeComm.title}</b></h4>
                      <p className="pae" style={{fontWeight:'300', padding: 0,}}>{childeComm.contentPera}</p>
                          <div className="flex gap-1">
                      {/* <button title="Edit post" className="modbtn" onClick={() => handleReply(parentCom._id, parentCom.name, parentCom.image)}> <FaEdit /></button> */}
                     
                </div>
                 </div>
                            ))
                          }
                    </div>
}
                
            </div>
     )
     )
      }

       <div className="test blogpagination">
                {hasPreviousPage && (
                    <button onClick={() => setcommentPage(commentPage - 1)}>
                        Previous
                    </button>
                )}
                
                {hasNextPage && (
                    <button onClick={() => setcommentPage(commentPage + 1)}>
                        Next
                    </button>
                )}
            </div>

      </>
     )
}


    return (
        <>
        <Head>
            <title>{slug}</title>
        </Head>

       <div>
  {
    blogData && (
      <div 
        className="blogslugpage"
        onMouseMove={handleMouseMove}
        data-aos="fade"
        data-aos-duration="800"
      >
        <div 
          className="footer-glow"
          style={{
            left: `${glowPosition.x}px`,
            top: `${glowPosition.y}px`,
          }}
        ></div>
        
        <div className="container">
          <div 
            className="blogslugpagecont"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="leftsitedetails">
              <div 
                className="testimonials-carousel"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <button 
                  className="nav-button prev" 
                  onClick={prevpro}
                  data-aos="fade-right"
                >
                  &lt;
                </button>
                
                <div className="testimonials-track">
                  {blogData.blog.images.map((comment, index) => (
                    <div 
                      className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
                      key={comment}
                      data-aos="flip-up"
                      data-aos-delay={400 + (index * 100)}
                    >
                      <div className="testimonial-content">
                        <img src={comment} alt={comment} />
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="nav-button next" 
                  onClick={nextpro}
                  data-aos="fade-left"
                >
                  &gt;
                </button>
              </div>
              
              <div 
                className="slugbloginfopub"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className="flex gap-2">
                  <div 
                    className="adminslug"
                    data-aos="fade-right"
                    data-aos-delay="600"
                  >
                    <img src="/img/coder.jpg" alt="" />
                    <span>By MYG Tech</span>
                  </div>
                  <div 
                    className="adminslug"
                    data-aos="fade-up"
                    data-aos-delay="650"
                  >
                    <IoCalendarOutline />
                    <span>{formatDate(createdAtDate)}</span>
                  </div>
                  <div 
                    className="adminslug"
                    data-aos="fade-left"
                    data-aos-delay="700"
                  >
                    <CiRead />
                    <span>Comments ({blogData.comments ? blogData.comments.length : 0})</span>
                  </div>
                </div>
                
                <div 
                  className="shareblogslug"
                  data-aos="zoom-in"
                  data-aos-delay="750"
                >
                  <div 
                    title="Copy URL" 
                    onClick={() => handleCopy(blogURL)}
                    data-aos="fade-right"
                  >
                    <BsCopy/> <span>{copied ? 'Copied!' : ''}</span>
                  </div>

                  <Link 
                    target="_blank" 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogURL)}`}
                    data-aos="fade-up"
                  >
                    <FaFacebook/>
                  </Link>
                  <Link 
                    target="_blank" 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Check out this blog post: " + blogURL)}`}
                    data-aos="fade-down"
                  >
                    <FaTwitter/>
                  </Link>
                  <Link 
                    target="_blank"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogURL)}`}
                    data-aos="fade-left"
                  >
                    <FaLinkedin/>
                  </Link>
                </div>
              </div>

              <div 
                className="blogslugtags"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="hh flex gap-2">    
                  <div className="tech-tags">
                    {blogData && blogData.blog.tags?.map((tech, index) => (
                      <span 
                        key={index}
                        data-aos="zoom-in"
                        data-aos-delay={900 + (index * 50)}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
   
              <h1 
                style={{color: "var(--main-site-color)", fontSize:'28px', textTransform:'capitalize'}}
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                {blogData.blog.title}
              </h1>
              
              {
                loading ? <Spinner /> : 
                <div 
                  className="blogcontent"
                  data-aos="fade-up"
                  data-aos-delay="1100"
                >
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code: ({
                        node, inline, className, children, ...props 
                      }) => {
                        const match1 = /language-(\w+)/.exec(className ||'');
                        const match = /language-(\w+)/.exec(className || '');
                        const [copied, setCopied] = useState(false);
                        
                        const handleCopy = () => {
                          navigator.clipboard.writeText(children)
                          setCopied(true);
                         
                          setTimeout(() => {
                              setCopied(false)
                          }, 3000);
                        }

                        if (inline) {
                          return <code>{children}</code>
                        } else if (!match) {
                          return (
                            <div style={{position: 'relative'}}>
                              <SyntaxHighlighter   
                                style={a11yDark}
                                language="HTML"
                                PreTag='pre'
                                {...props}
                                codeTagProps={{
                                  style:{
                                    padding: '0',
                                    marginLeft:'0',
                                    borderRadius: '5px',
                                    overflow: 'auto',
                                    whiteSpace:'pre-wrap'
                                  }
                                }}
                              >
                                {String(children).replace(/\n$/, '-').trim()}
                              </SyntaxHighlighter>
                              <button 
                                className="codebtn" 
                                onClick={handleCopy}  
                                style={{
                                  position:"absolute",
                                  top: '0',
                                  right: '0',
                                  zIndex: '100',
                                  padding:'.5rem',
                                  color: "#fff",
                                  background:'#000'
                                }}
                                data-aos="fade-left"
                              >
                                {copied ? 'Copied!' : 'Copy Code '}
                              </button>
                            </div>
                          )
                        } else {
                          return(
                            <code className="md-post-code" {...props}>
                              {children}
                            </code>
                          )
                        }
                      }
                    }}
                  >
                    {blogData.blog.description}
                  </ReactMarkdown>
                </div>
              }
              
              {
                blogData.comments.length > 0 && 
                <div 
                  className="blogusecomments"
                  ref={commentRef}
                  data-aos="fade-up"
                >
                  <h2>Comments</h2>
                  {
                    blogData.comments.length > 0 && RenderComments(blogData.comments)
                  }
                  {
                    blogData.comments.length === 0 && 
                    <div 
                      className="flex flex-center w-100"
                      data-aos="fade-up"
                    >
                      No Comments found
                    </div>
                  }
                </div>
              }
                       
              <div 
                className="blogslugcomments" 
                ref={replyformRef}
                data-aos="fade-up"
              >
                {
                  NewComm.parentName && (
                    <h2 data-aos="fade-right">
                      Leave a reply to <span className="perentname">{NewComm.parentName}</span> 
                      <button 
                        onClick={handleRemoveReply} 
                        className="removereplybtn"
                        data-aos="fade-left"
                      >
                        Remove Reply
                      </button>
                    </h2>
                  )
                }
                {
                  !NewComm.parentName && (
                    <h2 data-aos="fade-up">Leave a comment</h2>
                  )
                }
                
                <p data-aos="fade-up">Required info are marked by *. Note your Email will be hidden</p>
                
                <form 
                  className="leaveareplyform" 
                  onSubmit={handleCommentSubmit}
                  data-aos="fade-up"
                >
                  <div className="nameemailcomment">
                    <input 
                      type="text"
                      value={NewComm.name}
                      onChange={(e) => setNewComm({...NewComm, name: e.target.value})}
                      placeholder="Enter Your Name"
                      data-aos="fade-right"
                    />
                    <input 
                      type="email"
                      value={NewComm.email}
                      onChange={(e) => setNewComm({...NewComm, email: e.target.value})}
                      placeholder="Enter Your Email Address"
                      data-aos="fade-left"
                    />
                  </div>
                  
                  <input 
                    type="text"
                    value={NewComm.title}
                    onChange={(e) => setNewComm({...NewComm, title: e.target.value})}
                    placeholder="Enter Your Comment Title"
                    data-aos="fade-up"
                  />
                  
                  <textarea 
                    name="" 
                    rows={4} 
                    value={NewComm.contentPera}
                    onChange={(e) => setNewComm({...NewComm, contentPera: e.target.value})}
                    style={{resize:'none'}} 
                    placeholder="Write Your Comment Here" 
                    id="textcomments"
                    data-aos="fade-up"
                  ></textarea>
                  
                  <div className="flex gap-2">
                    <button 
                      type="submit"
                      data-aos="zoom-in"
                    >
                      Post Comment
                    </button>
                    {messageOk && (
                      <p 
                        style={{ 
                          color: messageOk.includes('✅') ? 'var(--main-site-color)' : 'red',
                          padding: '1rem',
                          background: 'var(--box-shadow)'
                        }}
                        data-aos="fade-up"
                      >
                        {messageOk}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="rightsitedetails">
              <div 
                className="rightslugsearchbar"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <input 
                  disabled={!searchInput ? false : true} 
                  onClick={handleSearchOpen} 
                  type="text" 
                  placeholder="Search blog here..." 
                />
                <button data-aos="zoom-in">
                  <IoSearch/>
                </button>
              </div>
              
              <div 
                className="rightslugcategory"
                data-aos="fade-left"
                data-aos-delay="400"
              >
                <h2>CATEGORIES</h2>
                <ul>
                  {Object.entries(likeCounts).map(([category, count], index) => (
                    <Link 
                      href={`/blogs/category/${category}`}
                      key={category}
                    >
                      <li 
                        data-aos="fade-up"
                        data-aos-delay={500 + (index * 50)}
                      >
                        {category}
                        <span>({count > 9 ? count : '0'+count})</span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
              
              <div 
                className="rightrecentpost"
                data-aos="fade-left"
                data-aos-delay="600"
              >
                <h2>RECENT POST</h2>
                {displayedPosts.length > 0 ? (
                  displayedPosts.map((blog, index) => (
                    <Link 
                      key={blog._id} 
                      className="rightrecentp" 
                      style={{height:'100%'}} 
                      href={`/blogs/${blog.slug}`}
                      data-aos="fade-up"
                      data-aos-delay={700 + (index * 100)}
                    >
                      <img 
                        style={{flexShrink: 0}} 
                        src={blog.images[0]} 
                        alt={blog.title} 
                      />
                      <div>
                        <h4 className="blotit" style={{ fontSize: '13px' }}>
                          {blog.title}
                        </h4>
                        <h4 className="mt-1 flex flex-wrap gap-1 flex-sb">
                          {blog.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </h4>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p data-aos="fade-up">No recent posts available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {
          delet && NewComm.parent && NewComm.title && 
          <div 
            className="deleteForm"
            data-aos="zoom-in"
          >
            <div className="deleteFormBox">
              <form 
                className="leaveareplyform" 
                onSubmit={HandleDeletForm}
                data-aos="fade-up"
              >
                <h3>
                  <div className="flex flex-center gap-1">
                    <IoWarning /> Confirm Delete
                  </div> 
                  <br/>"<span>{NewComm.title}</span>"
                </h3>
                <li><IoWarning/> Only The person who posted this comment can Delete</li>
                <li><IoWarning/>By deleting, all replied comments are also deleted</li>
                <li><IoWarning/>This action cannot be undone</li>
                <div 
                  className="clostbn" 
                  onClick={handleRemoveReply}
                  data-aos="fade-left"
                >
                  <FaX/>
                </div>
                <div className="nameemailcomment">
                  <input 
                    type="email"
                    value={deleteEmail}
                    onChange={(e) => setDeleteEmail(e.target.value)}
                    placeholder="Enter Your Email Address"
                    data-aos="fade-up"
                  />
                </div>
                <div className="flex gap-2">
                  <button 
                    type="submit"
                    data-aos="zoom-in"
                  >
                    Delete Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        }

        {
          searchInput && <Blogsearch cls={handleSearchClose} />
        }
      </div>
    )
  }
</div>
           
        </>
    );
};

export default BlogPage;
