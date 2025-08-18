import React, { useContext } from 'react'
import TodoCard from './TodoCard'
import "../styles/DisplayTodo.css"
import { TodosContext } from '../context/TodosContext'
const DisplayTodo = () => {
    const {todos, setTodos} = useContext(TodosContext)
    /// {todos} ==> todos array given by the parent
    /// It loops over the todos array and renders in the form of card
  return (
    <div className='todo-container'>
  {todos.map((todo)=> (
    <TodoCard 
    key={todo.id} 
    todo={todo}
//     todos={todos}
//   setTodos={setTodos} 
  />))}
    </div>
  )
}

export default DisplayTodo