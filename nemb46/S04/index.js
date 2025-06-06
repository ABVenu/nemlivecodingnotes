const express = require("express");

const TodoRouter = require("./routes/todo.routes");
const BlogRouter = require("./routes/blog.routes");
const loggerMiddleware = require("./middlewares/logger.middleware");
const app = express();
app.use(express.json()); // sense the incoming json body which is inbuilt middleware




// application level Middleware
app.use(loggerMiddleware)
app.get("/test", (req, res) => {
  res.send("This is test page");
});

/// Todo Router
app.use("/todos",TodoRouter);
///Blogs Routes
app.use("/blogs",BlogRouter);

app.listen(8000, () => {
  console.log("Server started");
});
