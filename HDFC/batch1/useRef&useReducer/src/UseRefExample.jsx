import React, { useRef, useState } from 'react'

const UseRefExample = () => {
    const inputRef = useRef() ;
  const inputRef2 = useRef() ;
  // function handleClick(){
  //   inputRef.current.focus()
  // }
  useEffect(()=>{
    inputRef.current.focus()
    inputRef2.current.focus()
  },[])
  const [time, setTime] = useState(0);
  const timerRef = useRef(null)
  function handleStart(){
    /// Increase the time for every 1 sec
     if(timerRef.current==null){
            timerRef.current = setInterval(()=>{
              setTime((prevTime)=> prevTime+1)
            },1000)
      }
  }
  function handleStop(){
    clearInterval(timerRef.current)
  }

  function handleReset(){
     clearInterval(timerRef.current)
     setTime(0)
  }
  return (
    <>
    {/* <h2>Simple Timer Application</h2>
        <h3>{time}</h3>
       <button onClick={handleStart}>Start Timer</button>
       <button onClick={handleStop}>Stop</button>
       <button onClick={handleReset}>Reset</button> */}
       <hr /> 
      {/* <button onClick={handleClick}>Focus Input Tag</button> */}
      <input ref={inputRef}  placeholder='Enter Text'/>
       <input ref={inputRef2}  placeholder='Enter Text'/>
    </>
  )
}

export default UseRefExample