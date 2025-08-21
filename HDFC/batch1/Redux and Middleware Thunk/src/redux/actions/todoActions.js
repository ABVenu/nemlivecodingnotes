import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from "../actiontypes/todosActionTypes"

/// These are sync actions
// One typical action returns object
/// that object is sensed by the reducer 

export const addTodo = (text)=>{
    return {type:ADD_TODO, payload:text}
}


export const editTodo = (id)=>{
    return {type:TOGGLE_TODO, payload:id}
}


export const deleteTodo = (id)=>{
    return {type:DELETE_TODO, payload:id}
}