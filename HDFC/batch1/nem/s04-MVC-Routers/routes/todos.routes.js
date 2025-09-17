const express = require("express");
const { getTodos, addTodos, updateTodo, deleteTodo } = require("../controllers/todo.controller");
const limiter = require("../middlewares/rateLimiter");

const TodoRouter = express.Router();

/// shift all the todos routes created in the index.js
const sampleRouterLevelMiddleware = (req,res,next)=>{
  console.log("This is router level MW, where all the req of this paases from this");
  next()
}

const sampleRequestLevelMiddleware2 = (req,res,next)=>{
  console.log("This is reuqest level MW, where all the add todo req of this passes from this");
  next()
}

TodoRouter.use(sampleRouterLevelMiddleware)
//TodoRouter.use(sampleRouterLevelMiddleware2)
TodoRouter.get("/",limiter ,getTodos);


const checkIncomingTodo = (req,res,next)=>{
    /// check the todo body
    const {title} = req.body;
    if(!title){
        /// reject the request 
        res.status(400).json({message:"No Title in the request"})
    }else{
        next()
    }
}
TodoRouter.post("/add-todo",checkIncomingTodo, sampleRequestLevelMiddleware2,addTodos );

TodoRouter.patch("/update-todo/:todoId", updateTodo);

TodoRouter.delete("/delete-todo/:todoId", deleteTodo);


module.exports = TodoRouter;
