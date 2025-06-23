const mongoose = require("mongoose");


const todoSchema = new mongoose.Schema({
    title:String,
    status:{type:Boolean, default:false},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
})


const TodoModel = mongoose.model("Todo", todoSchema);


module.exports = TodoModel;