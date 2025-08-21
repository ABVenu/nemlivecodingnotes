import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, editTodo } from '../redux/actions/todoActions'

const Todos = () => {
    const [title, setTitle] = useState("")
    const todos = useSelector((state)=> state.tasks.todos);
    const dispatch = useDispatch()
  //  console.log(todos)


    function handleAddTodo(){
        /// This should dispatch an action called as addTodo()
        // and pass text from the input tag to the addTodo()
        
        dispatch(addTodo(title))
       // dispatch({type:"ADD", payload:title})
        setTitle("")
    }
    return (
        <div>
            <div>
                <input value={title} onChange={(e)=> setTitle(e.target.value)} type="text" placeholder='Enter Todo' />
                <button onClick = {handleAddTodo}>Add Todo</button>
            </div>
            <div>
               {todos?.map((todo)=>(<div key={todo.id}>
                <h3>Title:{todo.title}</h3>
                <h4>Status: {todo.status? "Completed": "Pending"}</h4>
                <button onClick={()=> dispatch(editTodo(todo.id))}> Toggle Status</button>
                <button onClick={()=> dispatch(deleteTodo(todo.id))}> Delete</button>

               </div>))}
            </div>
        </div>
    )
}

export default Todos