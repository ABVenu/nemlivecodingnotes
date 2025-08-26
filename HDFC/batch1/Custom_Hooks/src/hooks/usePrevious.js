import { useEffect, useRef } from "react"


null
function usePrevious(value){
    /// useRef example

    const ref = useRef(null);

    useEffect(()=>{
        ref.current = value
    },[value])

    return ref.current

}

export default usePrevious
