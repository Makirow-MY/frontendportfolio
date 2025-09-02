import useFetchData from "@/hooks/useFetchData";
import { set } from "mongoose";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Spinner from "./Spinner";
import { useRouter } from 'next/router';


const extractFirstParagraph = (markdown) => {
    // Split markdown by double newline to separate paragraphs
    const paragraphs = markdown.split('\n\n')
    
    // Return the first paragraph (assuming paragraphs[0] is the first paragraph)
    if (paragraphs[0].length  > 200) {
        return `${paragraphs[0].slice(0, 180)}...`;
    }
    else{
        return paragraphs[0];
    }
   // return .slice(0, 180);
};

export default function Projectsearch(props) {
const router = useRouter()
    const { alldata } = useFetchData('/api/project');  // Assuming useFetchData returns an object with allwork and loading
    const [loading, setLoading] = useState(true);  // Initialize loading state
    const [searchResult, setSearchResult] = useState(null);
     const {category} = router.query;
    const [blogtitle, setBlogtitle] = useState('');  // blogtitle should be initialized as a string
console.log("alldata", alldata )
    // filter for published blogs required
    
 
    const publishedData = !category ? alldata.filter(ab => ab.status === 'publish') : alldata.filter(ab => ab.status === 'publish' && ab.projectcategory == category);

    // Function to handle search
    useEffect(() => {
        if (!blogtitle.trim()) {  // Here, blogtitle should be checked if it's an empty string
            setSearchResult([]);
            return;
        }

        const filteredblogs = publishedData.filter(blog =>
            blog.title.toLowerCase().includes(blogtitle.toLowerCase())
            || blog.slug.toLowerCase().includes(blogtitle.toLowerCase())
        );

        setSearchResult(filteredblogs);  // setSearchResult should be used to update searchResult state
         setLoading(false);  // Set loading to false after filtering
    }, [blogtitle, alldata]);  // Include allwork in dependencies to ensure useEffect updates when data changes

    const handleBlogClick = () => {
        setBlogtitle('');
        setLoading(true)  // This clears the input field when a blog is clicked
    };

    const [index, setIndex] = useState(0);
    
                useEffect(() => {
                 
    //setLength(blog.images.length)
                      const interval = setInterval(() => {
              setIndex((prev) => (prev + 1) % publishedData.length);
             
          }, 4000);
      
          return () => clearInterval(interval)
                
         
      
      },[index])

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
    return <>
        <div className="searchblogfix">
            <div className="searchblogsectionfix">
                <div className="sbsfinput flex gap-1">
                    <input type="text"
                    defaultValue={null}
                        placeholder={`Search ${category ? category : null}project here`}
                        value={blogtitle}
                        onChange={(e) => setBlogtitle(e.target.value)}
                    />
                    <div title="close" className='sbsinputclose' onClick={props.cls}>
                        <IoClose />                        
                    </div>
                </div>
                <div className="sbsfsearchlist mt-2">
                    { !loading && (<>
                        {searchResult.length === 0 ? <h3>No Project Found <span>(Verify spelling)</span></h3> : <>
                            {searchResult.slice(0, 10).map((blog) => {
                                return <Link href={`/blogs/${blog.slug}`} key={blog._id} className="sbsfsbox" onClick={props.cls}>
                                    <div className="flex gap-1 clasmid" style={{ alignItems: 'center', display:'flex' }}>
                                        <img src={blog.images[0]} alt="" />
                                        <div>
                                            <h2>{blog.title}</h2>
                                        <span style={{marginTop:'-10px'}}>Project Type: {blog.projectcategory}</span>
                                        </div>
                                        
                                    </div>
                                    
                                </Link>
                            })}

                        </>}

                    </>)}
                    {loading  && <div className="flex flex-center w-100 gap-1"><Spinner />   Waiting for you to type</div>}

                </div>
            </div>

        </div>
    </>
}