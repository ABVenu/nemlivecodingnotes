import express from "express";
import connectToDB from "./configs/mongo.config.js";
import 'dotenv/config'
import { UserRouter } from "./routes/user.routes.js";
import { TodoRouter } from "./routes/todo.routes.js";
const PORT = process.env.PORT || 8080
const app = express();
app.use(express.json())
// test route


app.get("/test", (req,res)=>{
    res.send(`<h1 style="color:teal">This is test route<h1>`)
})

// User routes

app.use("/auth", UserRouter)
// 
app.use("/users/todos", TodoRouter)
/// handling undefined route
app.use((req,res)=>{
    res.status(404).json({message:"This Request Is Not Found"})
})
app.listen(PORT, ()=>{
    connectToDB()
    console.log("Server started")
})