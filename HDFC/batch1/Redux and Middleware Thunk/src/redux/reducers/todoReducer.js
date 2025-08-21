import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from "../actiontypes/todosActionTypes"

// const todoReducer = (state = [{id:1,title:"Todo 1", status:false}],action)=>{
//     switch(action.type){
//         case ADD_TODO:
//             // Todo Title is coming from payload
//             let newId = state[state.length-1].id +1
//             return state.push({id:newId, title:action.payload, status:false})
//          //   return [...state,{id:newId, title:action.payload, status:false}] 
//         case TOGGLE_TODO:
//             /// status should be changed
//             let updatedTodos = state.map((todo)=> {
//                 if(todo.id == action.payload){
//                     return {...todo,status:!todo.status}
//                 }else{
//                     return todo
//                 }
//             })
//         return [...updatedTodos]
//          case DELETE_TODO:
//             /// status should be changed
//             let filteredTodos = state.filter((todo)=> todo.id != action.payload)
//             return [...filteredTodos]
//         default:
//             return state
// }
// }

// export default todoReducer

const todoReducer = (state = {todos:[{id:1,title:"Todo 1", status:false}]},action)=>{
    switch(action.type){
        case "ADD_TODO":
            // Todo Title is coming from payload
            let newId = state.todos[state.todos.length-1].id +1
            return {...state,todos: [...state.todos, {id:newId, title:action.payload, status:false}] }
        case "TOGGLE_TODO":
            /// status should be changed
            let updatedTodos = state.todos.map((todo)=> {
                if(todo.id == action.payload){
                    return {...todo,status:!todo.status}
                }else{
                    return todo
                }
            })
        return {...state,todos: updatedTodos }
         case "DELETE_TODO":
            /// status should be changed
            let filteredTodos = state.todos.filter((todo)=> todo.id != action.payload)
            return {...state,todos: filteredTodos }
        default:
            return state
}
}

export default todoReducer