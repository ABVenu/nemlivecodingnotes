import { useEffect, useState } from "react"

  
  function useLocalStorage (keyName, valueToBeStored){

   let storedDataInLS = JSON.parse(localStorage.getItem(keyName)) || valueToBeStored;

    const [value, setValue] = useState(storedDataInLS)
    /// value should be stored fron the localStorage
    ///create a function that stores data into the localStorage, and set value from the useState;
    const setStoredValue = (newValue)=>{
        setValue(newValue);
       // console.log("in the hook", newValue)
        localStorage.setItem(keyName, JSON.stringify(newValue))
       
    }
    useEffect(()=>{
        localStorage.setItem(keyName, JSON.stringify(value))
    },[value])

    return [value, setStoredValue]
    

  }


export default useLocalStorage