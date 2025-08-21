/// In this file combine all the reducers created
/// combining happens with a help of function combinedReducers form redux

import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import counterReducer from "./counter";
import postReducer from "./postReduer";


const rootReducer = combineReducers({
    tasks: todoReducer,
    counter:counterReducer,
    posts:postReducer
})


export default rootReducer