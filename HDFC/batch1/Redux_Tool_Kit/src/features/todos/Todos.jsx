import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, updateStatus } from './todoSlice';

const Todos = () => {
    const [todo,setTodo] = useState("")

    const {data} = useSelector((state)=> state.todos);
    const dispatch = useDispatch()
    console.log("data", data)
  return (
    <div>
        <input type="text" placeholder='Add todo' value={todo} onChange={(e)=> setTodo(e.target.value)} />
        <button onClick={()=> dispatch(addTodo(todo))}>Add Todo</button>
        <hr />
        {data?.map((todo)=>(<div key={todo.id} style={{border:"1px solid gray"}}>
            <h4>title: {todo.title}</h4>
            <h4>status: {todo.status? "Completed":"Pending"}</h4>
            <button onClick={()=> dispatch(updateStatus(todo.id))}>Toggle Status</button>
        </div>))}
    </div>
  )
}

export default Todos