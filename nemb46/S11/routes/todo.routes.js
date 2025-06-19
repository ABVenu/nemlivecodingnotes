const express = require("express");
const TodoModel = require("../models/todo.model");
const authMiddleware = require("../middleware/auth.middleware");


const TodoRouter = express.Router();

/// This is protected route
/// only logged in Users should be able use the route
TodoRouter.post("/add-todo",authMiddleware ,async (req,res)=>{
    // title, loginProof
   
     // req.userId is given by AuthMiddleware
    let todo = await TodoModel.create({title:req.body.title,createdBy:req.userId});
    res.status(201).json({message:"Todo Added", todo})
})
// Get My Todos, protected Route

TodoRouter.get("/my-todos",authMiddleware ,async(req,res)=>{
   // auth middleware is giving req.userId

   let todos = await TodoModel.find({createdBy:req.userId});
   res.status(200).json({message:"Todos List", todos})
})

module.exports = TodoRouter;