import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {increment,decrement,incrementByValue} from "./counterSlice.js"

const Counter = () => {
    // get count form state state has a slice called as counter
   // useSelector helps to get the state

   const {value} = useSelector((state)=> state.counter)
   console.log("value", value)
   const dispatch = useDispatch()

   function handleInc(){
    /// dispatch the action that is increment
    // import the actions from counterSlice
       dispatch(increment())
   }
  return (
    <div>
      <h3>Counter:{value}</h3>
     <button onClick={handleInc}>Increment</button>
     <button onClick={()=> dispatch(decrement())}>decrement</button>
      <button onClick={()=> dispatch(incrementByValue(10))}>Increment By 10</button>
    </div>
   
  )
}

export default Counter