import React, { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebouncing';

const Debounce = () => {

    const [name, setName] = useState("");
    const useDebounceValue = useDebounce(name, 500)

    useEffect(()=>{
        if(useDebounce){
            console.log("Searching...", useDebounceValue)
        }
    },[useDebounceValue])
    
  return (
    <div>
        <h4> Debounce</h4>
        <input type="text" 
        placeholder='Enter Name' 
        value={name}
        onChange={(e)=> setName(e.target.value)}/>
    </div>
  )
}

export default Debounce