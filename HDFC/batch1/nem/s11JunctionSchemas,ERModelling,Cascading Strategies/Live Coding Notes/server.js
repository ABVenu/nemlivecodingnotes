import express from "express";
import connectToDB from "./configs/mongo.config.js";
import 'dotenv/config'
import { StudentRouter } from "./routes/student.routes.js";
import { CourseRouter } from "./routes/course.routes.js";
const PORT = process.env.PORT || 8080
const app = express();
app.use(express.json())
// test route


app.get("/test", (req,res)=>{
    res.send(`<h1 style="color:teal">This is test route<h1>`)
})

app.use("/students", StudentRouter)
app.use("/courses", CourseRouter)


/// handling undefined route
app.use((req,res)=>{
    res.status(404).json({message:"This Request Is Not Found"})
})
app.listen(PORT, ()=>{
    connectToDB()
    console.log("Server started")
})