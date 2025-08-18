
/// Create Context

import { createContext, useState } from "react";

export const TodosContext = createContext();

export const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState([
    { id: 1, title: "Todo 1", status: false },
    { id: 2, title: "Todo 2", status: false },
    { id: 3, title: "Todo 3", status: true },
    { id: 4, title: "Todo 4", status: false },
    { id: 5, title: "Todo 5", status: false }
    ])
    /// Core logic of the todos


    function addTodo(title){
     setTodos([...todos, 
        { id: todos[todos.length - 1].id + 1, 
        title: title, status: false }])
    }

    function updateTodo(id,title,status){
        /// This fn takes title, status and makes changes in the todo Array
        /// make changes in todoArray (todos)
        /// update in the memory (setTodos)
        let updatedTodo = {id, title,status};
       console.log(updatedTodo);

       let updatedTodos = todos.map((todo)=>{
        if(todo.id == id){
            return updatedTodo
        }else{
            return todo
        }
       })
       setTodos(updatedTodos)
    }

    return (
    <TodosContext.Provider value={{todos,setTodos,addTodo,updateTodo}}>
        {children}
    </TodosContext.Provider>)
}