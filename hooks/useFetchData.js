const { useState, useEffect } = require("react");
const { default: toast } = require("react-hot-toast");
import axios from 'axios';

function useFetchData(url) {
     const [alldata, setAllData] = useState([]);
     const [loading, setLoading] = useState(true);
     const [initloading, setInitLoading] = useState(true);


     useEffect(() => {
                 if (initloading) {
                   setInitLoading(false);
                   setLoading(false) ;
                   return;
                 }
                 setLoading(true);

                 const fetchAllData = async()=>{
                    try {

                      const AllResponse = await  fetch(url);
        

        const Data = await AllResponse.json();
       
                                                
                            setAllData(Data)
                   //  console.log("feact data", url , Data)
                     
                       setLoading(false)
                    } catch (error) {
                           setLoading(false)
                    }
                    finally{
                        setLoading(false)
                    }
                 }

                 if (url) {
                   
                     fetchAllData()
                 }
     }, [initloading, url, alldata.length])

        return {alldata, loading}
}

export default useFetchData;