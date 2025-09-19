import 'dotenv/config'
import express from "express"
import { TodoRouter } from './routes/todo.routes.js';
import connectToDB from './configs/mongo.config.js';
import { UserRouter } from './routes/user.routes.js';

const app = express();

app.use(express.json())


app.use("/todos", TodoRouter)

app.use("/users", UserRouter)

app.listen(8080, ()=>{
    connectToDB()
    console.log("Server Started")
})