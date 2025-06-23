const express = require("express");
const TodoModel = require("../models/todo.model");
const authMiddleware = require("../middleware/auth.middleware");
const roleBasedAccessControl = require("../middleware/roleCheck.middleware");


const TodoRouter = express.Router();

/// This is protected route
/// only logged in Users should be able use the route
TodoRouter.post("/add-todo",authMiddleware,roleBasedAccessControl("admin", "user") ,async (req,res)=>{
    // title, loginProof
   
     // req.userId is given by AuthMiddleware
    let todo = await TodoModel.create({title:req.body.title,createdBy:req.userId});
    res.status(201).json({message:"Todo Added", todo})
})
// Get My Todos, protected Route

TodoRouter.get("/my-todos",authMiddleware, roleBasedAccessControl("admin","user","external", "internal") ,async(req,res)=>{
   // auth middleware is giving req.userId
   // looged in user will be thier own todos
   let todos = await TodoModel.find({createdBy:req.userId});
   res.status(200).json({message:"Todos List", todos})
})


// Admins can see everyone's todos
TodoRouter.get("/alltodos",authMiddleware,roleBasedAccessControl("admin"),  async (req,res)=>{
       let todos = await TodoModel.find();
   res.status(200).json({message:"Todos List", todos})

})
module.exports = TodoRouter;