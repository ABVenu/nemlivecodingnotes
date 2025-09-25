import express from "express";
import { authMidlleware } from "../middlewares/auth.middleware.js";
import { TodoModel } from "../models/todo.model.js";
import { roleBasedAccessContolMiddleware } from "../middlewares/roleBasedAccess.middleware.js";
import { USER } from "../utlis/allowed.roles.js";



export const TodoRouter = express.Router();

// Add a todo --> but only logged in User are allowed for this operation
TodoRouter.use(authMidlleware)
TodoRouter.use(roleBasedAccessContolMiddleware([USER]))


/// The allowed role for this route is user
TodoRouter.post("/add-todo",authMidlleware,async(req,res)=>{
  // title, status from req.body
  // createdBy should be added from BE, as only logged in user used thsi route
  /// As User aleady proved the identity and got the token
  //console.log("req.userid in add todo route", req.user.userId)
  let todo = await TodoModel.create({...req.body, createdBy:req.userId})
  res.send("todo added")
})


// Get My Todos --> Only logged In User Can Acceess This
TodoRouter.get("/mytodos",async(req,res)=>{
  let todos = await TodoModel.find({createdBy:req.user.userId});
  res.json({message:"Todos List", todos})
})