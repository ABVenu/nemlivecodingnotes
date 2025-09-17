const express = require("express");
const fs = require("fs")


const PostRouter = express.Router();
/// Get Request of the todos
PostRouter.get("/", (req,res)=>{
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"))
    let posts = data.posts;

    res.send(posts)
})




/// ADD POST
PostRouter.post("/add-post", (req,res)=>{
    /// client sends title as req body
    /// server should accept the req body and put into db.json and give res as "todo added"
  //  console.log("req.body",req.body)
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"))
    let posts = data.posts;
    let newPost = {...req.body, id:posts[posts.length-1].id+1};
    //console.log(newTodo)
    posts.push(newPost)
    /// update in the DB.json
  //  fs.appendFileSync("./db.json", JSON.stringify(data))
  fs.writeFileSync("./db.json", JSON.stringify(data))
  //  console.log("todos", todos)
    res.send("post added")
})


module.exports = PostRouter;