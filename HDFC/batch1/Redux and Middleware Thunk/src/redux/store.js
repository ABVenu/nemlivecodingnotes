
import { applyMiddleware, createStore} from "redux"
import counterReducer from "./reducers/counter.js"
import todoReducer from "./reducers/todoReducer.js";
import rootReducer from "./reducers/rootReducer.js";
// import logger from "./middlewares/logger.js";
// import logger2 from "./middlewares/Looger2.js";
import { thunk } from "redux-thunk";
/// createStore and attach the reducer here

import logger from 'redux-logger'
// const store = createStore(counterReducer); // --> single store


const store = createStore(rootReducer, applyMiddleware(logger,thunk)); 
/// --> combime multiple store as root reducer and apply
export default store