import React, { useEffect, useReducer, useState } from 'react'



function reducerFn(state,action){
    switch(action.type){
        case "Loading":
            return {...state,loading:true}
        case "Success":
            return {...state, loading:false,todos:action.payload}
        case "Failure":
            return {...state,loading:false,todos:[], error:action.payload }
        case "Delete_Todo":
            let filteredTodos = state.todos.filter((el)=> el.id != action.payload) 
            return {...state,todos:filteredTodos}
    }
}
const intialState = {
    loading:false,
    todos:[],
    error:null
}
const UseReducer2 = () => {
    // const [loading, setLoading] = useState(false)
    // const [todos,setTodos] = useState([])
    // const [error,setError] = useState(null)
    const [state,dispatch] = useReducer(reducerFn, intialState)
    async function fetchData(page = 1, limit = 10) {
       
        try {
            let res = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`);
            let data = await res.json();
            // setTodos(data)
            // setLoading(false)
            dispatch({type:"Success", payload:data })
            // console.log(data)
        } catch (err) {
            console.log("err in fetching data")
            // setLoading(false)
            // setError("Failed To Fetch")
            // setTodos([])
            dispatch({type:"Failure", payload:"Failed To Fetch"})
        }
    }
    useEffect(()=>{
    //    setLoading(true)
    dispatch({type:"Loading"})
       setTimeout(()=>{
         fetchData()
       },3000)
    },[])

    return (
        <div>
            {state.loading==true? <h4> Loading....</h4>:""}

           {state.todos.length>0 && <h4>Todos Fetched</h4>}
           {state.error && <h4 style={{color:"red"}}>Failed To Fetch</h4>}

           {state.todos?.map((todo)=>(<div style={{border:"1px solid blue", margin:"5px", width:"40%", padding:"5px"}} key={todo.id}>
            <h5>title: {todo.title}</h5>
            <button onClick={()=> dispatch({type:"Delete_Todo", payload:todo.id})}>Delete</button>
            </div>))}

        </div>
    )
}

export default UseReducer2