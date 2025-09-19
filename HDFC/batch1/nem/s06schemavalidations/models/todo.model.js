/// create Todo Schema 
/// This simple schema without validation
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:String,
    status:Boolean,
    description:String
})

export const TodoModel = mongoose.model("Todo", todoSchema);

