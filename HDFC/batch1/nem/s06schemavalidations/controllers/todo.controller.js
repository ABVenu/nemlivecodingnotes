import { TodoModel } from "../models/todo.model.js"

export const getAllTodos =  async (req,res)=>{
   try{
     let todos = await TodoModel.find()
    res.status(200).json({message:"Todos List", todos})
   }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}

export const addTodo = async (req,res)=>{
    /// I will get title, status, description from req.body
    try{
        ///.create method
        //let todo = await TodoModel.create(req.body);
        //// new and .save() method
        // let todo = new TodoModel(req.body);
        // await todo.save()
        /// insertMany
        let todo = await TodoModel.insertOne(req.body)
        res.status(201).json({message:"Todo Added", todo})
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}

export const updateTodoById = async(req,res)=>{
     try{
       /// todoId is coming from path params
       /// data to be updated coming from the body 
       const {todoId} = req.params;
       ///findByIdAndUpdate accepts id, data to be updated in the object, req.body is object
       let todo = await TodoModel.findByIdAndUpdate(todoId, req.body,{new:true})
       res.status(201).json({message:"Todo updated", todo})

    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}

export const markTodoCompleted = async(req,res)=>{
     try{
       ///update status of all false to true
       let todos = await TodoModel.updateMany({status:false}, {status:true}, {new:true})
       res.status(201).json({message:"Todo updated", todos})

    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}




