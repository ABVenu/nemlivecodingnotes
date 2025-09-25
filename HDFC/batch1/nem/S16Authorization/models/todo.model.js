import mongoose from "mongoose";



const todoSchema = new mongoose.Schema({
    title:{type:String, required:true},
    status:{type:Boolean, default:false},
    visiblity:{type:String, enum:["public", "private"]},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
})

export const TodoModel = mongoose.model("Todo", todoSchema)

