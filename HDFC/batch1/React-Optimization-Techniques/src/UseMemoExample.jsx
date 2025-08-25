import React, { useCallback, useMemo, useState } from 'react'

/// Example for useMemo --> for the values 
const DoubleNumber = ({number})=>{
   // console.log("start of child component");
    function double(number){
         console.log("This is child component...",number*2)
        return number * 2
    }
    let result = useMemo(()=>{
        return double(number)
    },[number])
    return <p> {result} </p>
}
// Example for React.memo --> for the props
const ChildComponent2 = React.memo(({label})=>{
      console.log(`I am ${label } geting rerendered....`)
    return <p>I am child component: {label}</p>
})

/// Example for useCallback --->> for the functions
const ChildComponent3 = React.memo(({label,onClick})=>{
    console.log(`I am ${label } geting rerendered....`)
    return <button onClick={onClick}>I am child component: {label}</button>
})

/// Main Component
const UseMemoExample = () => {
    const [input, setInput] = useState(0);
    const [color, setColor] = useState(false);

    const handleClick = useCallback(()=>{
        console.log("Button is clicked")
    },[])

  return (
    <div style={{background:color ? "lightgreen":"lightblue", padding:"10px", margin:"10px"}}>
       <input value={input} onChange={(e)=> setInput(e.target.value)} type="number" placeholder='Enter Number' />
       <button onClick={()=> setColor((prev)=> !prev)}>Toggle Theme</button>
       <DoubleNumber number={input} />
       <ChildComponent2 label="Child no 2" />
       <ChildComponent3 label="Child No 3" onClick={handleClick}/>
    </div>
  )
}

export default UseMemoExample