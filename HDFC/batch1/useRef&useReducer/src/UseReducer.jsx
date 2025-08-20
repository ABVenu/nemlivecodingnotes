import React, { useEffect, useReducer, useState } from 'react'



function reducerFn(state,action){

    switch(action.type){
        case "Increment":
            return {count:state.count+1}
        case "Decrement":
            return {count:state.count-1}
        default:
            return state
    }
}
const initialState = {count:2};





















const UseReducer = () => {
    const [state,dispatch] = useReducer(reducerFn, initialState)
    function handleInc() {
         dispatch({type:"Increment"})
    }
    return (
        <div>
            <h3>count:{state.count}</h3>
            <button onClick={handleInc}>Inc</button>
             <button onClick={()=> dispatch({type:"Multipy"})}>Dec</button>
        </div>
    )
}

export default UseReducer


    /// state--> defined in the useReducer as initialState
    /// action ---> is an object which is having two details
    /// first detail is type--> which type of function should be called
    /// second is detail is payload --> payload is the data sent by the function
    /// action --> {type:<>, payload:<>}
    // define all the possible functions using switch