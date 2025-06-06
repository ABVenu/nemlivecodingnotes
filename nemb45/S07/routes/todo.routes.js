const express = require("express");
const TodoModel = require("../models/todo.model");


const TodoRouter = express.Router();

TodoRouter.post("/add-todo", async (req,res)=>{
   try{
    let todo = new TodoModel(req.body);
    await todo.save(); /// .save(), very very very highly needed function for dev
    res.status(201).json({messsage:"Todo Added"})
   }catch(err){
    console.log(err)
    res.status(500).json({message:"Something went wrong...."})
   }
})

TodoRouter.get("/alltodos", async (req,res)=>{
  /// skip and limit will be sent through query

  const {page,limit} = req.query;
  let skippingItems = (page-1)*limit;
    let todos = await TodoModel.find().skip(skippingItems).limit(limit)
    res.status(200).json({message:"Todos List", todos})
})

TodoRouter.patch("/update-todo/:todoId", async(req,res)=>{
   /// Data to be updated is coming from req.body
   const {todoId} = req.params;

   console.log(todoId, req.body)
   let todo = await TodoModel.findByIdAndUpdate(todoId,req.body, {new:true});  
   /// first one is finding by Id and secod parameter data to be updated
   res.status(201).json({message:"Todo Updated", todo})

})
module.exports = TodoRouter;