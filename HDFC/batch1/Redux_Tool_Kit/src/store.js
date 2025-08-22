import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice.js"
import todoReducer from "./features/todos/todoSlice.js"
import postReducer from "./features/posts/postSlice.js"

/// step 4 configure created stores here using configureStore from redux toolkit


const store = configureStore({
    reducer:{
        counter: counterReducer,
        todos: todoReducer,
        posts:postReducer
    },
    // middleware:(getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(logger2, logger), // add custom middleware at the end
})

export default store