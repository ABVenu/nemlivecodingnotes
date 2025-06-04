const fs = require("fs");
const os = require("os")
const express = require("express");
const app = express();
// calling express function which in return provides and object with many functionalities

app.get("/", (req,res)=>{
    res.send("This is first route")
})
app.get("/home",(req,res)=>{
    console.log(req.method, req.url)
    res.send(`<h3 style="color:blue">This Is Home Page, Get Request</h3>`)
})
app.post("/home",(req,res)=>{
    res.send(`<h3 style="color:blue">This Is Home Page, POST Request</h3>`)
})
app.get("/contact-us", (req,res)=>{
    res.json({message:"This is contact us page"})
})
app.get("/readfile", (req,res)=>{
    let data = fs.readFileSync("./data.txt", {encoding:"utf-8"})
    res.send(data)
})
app.get("/myosdetails", (req,res)=>{
   let data = os.cpus();
   res.send(data)
})
app.listen(8000, ()=>{
    console.log("Server Started")
})