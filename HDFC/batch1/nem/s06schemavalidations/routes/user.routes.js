import express from "express"
import { UserModel } from "../models/user.model.js"


export const UserRouter = express.Router()


UserRouter.post("/add-user", async (req,res)=>{
   try{
     let user = await UserModel.create(req.body)
    res.status(201).json({message:"Useer Created",user})
   }catch(err){
        console.log(err.message)
        res.status(500).json({message:"Something went wrong"})
    }
})

UserRouter.get("/all-users", async (req,res)=>{
   try{
     let users = await UserModel.find()
    res.status(200).json({message:"User List",users})
   }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
})


UserRouter.patch("/update-user/:userId", async (req,res)=>{

    const {userId} = req.params;
   try{

    /// --v will not work is findByIDAndUpdate is used
   ///  let user = await UserModel.findByIdAndUpdate(userId, req.body, {new:true})
    
    // .save is one way to update
    let user = await UserModel.findById(userId);
  // user.name = req.body.name
   user.subjects = [...user.subjects, ...req.body.subjects]
    await user.save()
    res.status(200).json({message:"User Updated",user})
   }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
})

