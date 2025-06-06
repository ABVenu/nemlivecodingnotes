const express = require("express");

const {
  getTodos,
  addTodos,
  deleteTodos,
  updateTodos,
} = require("../controllers/todo.controllers");
const todoMiddlewares = require("../middlewares/todo.middlewares");
const limiter = require("../middlewares/ratelimiter.middleware");
const { getData } = require("../models/todo.model");
const TodoRouter = express.Router();
TodoRouter.use(todoMiddlewares);  /// Router Level Middleware
/// Todo Routes
/// Get By Query
TodoRouter.get("/get", (req,res)=>{
   const {title} = req.query;
   let data = getData().data;  
  let todos = data.todos;
  let filteredTodo = todos.filter((todo)=>{
    if(todo.title == title){
      return todo
    }
  })
  res.json({ message: "List Of Todos", todos:filteredTodo });
  res.send("This is response")
})
/// Get Todos
TodoRouter.get("/all-todos", limiter,getTodos);


const checkIncomingData = (req,res,next)=>{
  console.log(req.body.title)
  if(!req.body.title && !req.body.status){
    // No Title and Status is present in the body
    res.status(400).json({message:"Invalid Body"})
   
  }else{
    /// given request is valid, so allow to add todo in DB
    /// how to allow????, by using next 
     next()
  }
}
/// Post request which adds data into DB
TodoRouter.post("/add-todo",checkIncomingData,addTodos);  // Route level Middleware
// This route is passing through 3 Middlewares

TodoRouter.delete("/delete-todo/:todoId", deleteTodos);

TodoRouter.patch("/update-todo/:todoId", updateTodos);

module.exports = TodoRouter;
