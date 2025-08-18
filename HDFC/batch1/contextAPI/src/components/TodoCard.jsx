import React, { useContext, useState } from 'react'
import "../styles/TodoCard.css"
import EditTodo from './EditTodo'
import { TodosContext } from '../context/TodosContext'
const TodoCard = ({ todo}) => {
    const {todos, setTodos} = useContext(TodosContext)
    const [openModal, setOpenModal] = useState(false)
    /// It takes single todo object 
    /// renders a card with title and status
    return (
        <div className='todo-card'>
            <h3>Title: {todo.title}</h3>
            <h4>Status: {todo.status ? "Completed" : "Pending"} </h4>
            <button onClick={() => setOpenModal(true)}>Edit Todo</button>
            {/* <EditTodo todo={todo} todos={todos} setTodos={setTodos} /> */}
            {openModal && <EditTodo todo={todo}  setOpenModal={setOpenModal} />}
        </div>
    )
}

export default TodoCard