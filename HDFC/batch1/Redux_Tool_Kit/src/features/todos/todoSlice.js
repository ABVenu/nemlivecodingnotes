import { createSlice } from "@reduxjs/toolkit";


/// step 1 create slice - state - action and reducers 
const todoSlice = createSlice({
    name:"todos",
    initialState:{data:[]},
    reducers:{
        addTodo: (state,action)=>{
            let newTodo = {
                id:state.data.length == 0? 1:state.data[state.data.length-1].id+1,
                title:action.payload,
                status:false
            }

            // Mutating state directly 
            state.data.push(newTodo)
        },
        updateStatus:(state,action)=>{
            /// let us directly mutate the todo status
            // it accpets payload as todoId
           // console.log(action.payload)
            let targetTodoIndex = state.data.findIndex((todo)=> todo.id == action.payload );
            let targetTodo = state.data[targetTodoIndex];
            /// Mutating state directly
            targetTodo.status = !targetTodo.status
        }
    }
})

/// step 2 export actions
export const {addTodo,updateStatus} = todoSlice.actions;

/// step 3 export the reducer 

export default todoSlice.reducer