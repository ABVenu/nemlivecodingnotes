import React, { useEffect, useState } from 'react'
import usePrevious from '../hooks/usePrevious';
import useDebounce from '../hooks/useDebouncing';

const PreviousHistory = () => {

    // it remembers the previous number

    const [number, setNumber] = useState(0);
   
    const previousNumber = usePrevious(number)
    const useDebounceValue = useDebounce(previousNumber, 800)



   
  return (
    <div>
        <input type="text" placeholder='Enter Number' value={number} onChange={(e)=> setNumber(e.target.value)} />
        <h3>PreviousHistory w/o debounce: {previousNumber ?? "NA" }</h3>
         <h3>PreviousHistory with debounce: {useDebounceValue ?? "NA" }</h3>
    </div>
  )
}

export default PreviousHistory