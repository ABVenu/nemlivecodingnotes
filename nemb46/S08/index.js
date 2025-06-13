require('dotenv').config()
const express = require("express");
const connectToDB = require("./configs/mongodb.config");
const UserRouter = require("./routes/user.routes");
const OrderRouter = require("./routes/order.routes");
const app = express();
app.use(express.json())
connectToDB(); // connect Mongo to Node js
app.get("/test", (req,res)=>{
    res.send("This is test route")
})
/// User Routes
app.use("/users", UserRouter)
/// Order Routes
app.use("/orders", OrderRouter)
app.listen(8000,()=>{
    console.log("Server Started")
})