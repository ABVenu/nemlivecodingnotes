const express = require("express");
const fs = require("fs");
const BlogRouter = express.Router();

BlogRouter.get("/all-blogs", (req, res) => {
  /// send the todos are response
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  //console.log(data.todos);
  let blogs = data.blogs;
  res.json({ message: "List Of Blogs", blogs });
});
module.exports = BlogRouter;