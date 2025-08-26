import { useEffect, useState } from "react"


const useFetch = (url)=>{
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);

    async function fetchData(url){
        setLoading(true)
        try{
            let res = await fetch(url);
            let d = await res.json();
        //    console.log("data", d)
            setData(d)
            setLoading(false)
        }catch(err){
            setError(err.message);
            setLoading(false)
        }
    }

    useEffect(()=>{

        fetchData(url)
       // console.log("dats in the useeffect", data)
    },[url])

    return [loading,data,error ]
}

export default useFetch