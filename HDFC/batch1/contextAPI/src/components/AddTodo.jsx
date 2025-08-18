import React, { useContext, useState } from 'react'
import { TodosContext } from '../context/TodosContext';

const AddTodo = () => {
    const {addTodo } = useContext(TodosContext)
    /// Adds Todo into the Todo Array
    /// This component has an input tag which
    //  accepts Todo Title
    const [title, setTitle] = useState("")


    function handleAdd() {
        /// This function creates a todo, 
        // title from useState, status false by default
        // id last todo id + 1
        // Once todoObject is ready push into the todosArray
        // we need setTodos setter fn from parent
        addTodo(title)
        alert("Todo Added")
        setTitle("")
    }
    return (
        <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Todo Name' />
            <button onClick={handleAdd}>Add Todo</button>
        </div>
    )
}

export default AddTodo