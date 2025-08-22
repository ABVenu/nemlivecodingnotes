// npm install @reduxjs/toolkit react-redux
import { createSlice } from "@reduxjs/toolkit";


/// create Slice accepts an object
/// that object has name of slice, initialState, reducers as Key-values pairs
// Reducers is an object which as action as key and its reducerfn as value
// step 1  create slice
const counterSlice = createSlice({
    name:"counter",
    initialState:{value:0},
    reducers:{
        /// key --> action and value --> its reducer fn
        increment: (state)=> 
            {state.value+=1},
        decrement: (state)=> 
            {state.value-=1},
        incrementByValue: (state,action) => 
            {state.value += action.payload}
    }
})

// step 2 export actions (to components)
export const {increment,decrement,incrementByValue} = counterSlice.actions

/// step 3 export reducer to store (that is counterSlice.reducer)
export default counterSlice.reducer

/// step 4 configure counterSlice in the store