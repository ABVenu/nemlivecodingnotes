import React, { useState } from 'react'
import DisplayTodo from './DisplayTodo'
import AddTodo from './AddTodo'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const TodosPage = () => {
  const {isloggedIn} = useContext(AuthContext)
    // const [todos, setTodos] = useState([{id:1,title:"Todo 1", status:false},
    //    {id:2,title:"Todo 2", status:false},
    //    {id:3,title:"Todo 3", status:true},
    //    {id:4,title:"Todo 4", status:false},
    //    {id:5,title:"Todo 5", status:false}
    // ])
    ///This is main Todo Application page
//   return (
//     <div>
//         <h3 style={{textAlign:"center"}}>Todos Page</h3>
//         <AddTodo todos={todos} setTodos={setTodos} />
//         <DisplayTodo todos={todos} setTodos={setTodos}/>
//     </div>
//   )

  return (
    <div>
        <h3 style={{textAlign:"center"}}>Todos Page</h3>
        <AddTodo />
      { isloggedIn && <DisplayTodo />}
    </div>
  )
}

export default TodosPage