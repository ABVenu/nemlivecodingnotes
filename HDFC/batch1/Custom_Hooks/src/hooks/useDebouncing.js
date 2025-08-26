import { useEffect, useState } from "react";



function useDebounce (value, delay){
    const [useDebounceValue, setDebounceValue] = useState(value);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounceValue(value)
        },delay)
      //whnever new timer starts, remove the old timer
        return ()=> clearTimeout(timer)
    },[value, delay])

    return useDebounceValue
}


export default useDebounce