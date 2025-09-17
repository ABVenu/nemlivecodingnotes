const express = require("express");
const TodoRouter = require("./routes/todos.routes");
const PostRouter = require("./routes/posts.routes");
const sampleAppLevelMiddleware = require("./middlewares/appLevelMiddleware");
const loggerMiddleware = require("./middlewares/loggerMiddleware");

const app = express();
app.use(express.json()); /// middleware - parses json body - inbuilt middleware
// CRUD of the todos
// Apply the rate limiting middleware to all requests.

/// The below is app level middleware, 
app.use(sampleAppLevelMiddleware)

app.use(loggerMiddleware)
/// Test Get Route
app.get("/", (req, res) => {
  res.send(`<h1 style="color:teal">Welcome to backend application<h1>`);
});

/// import and apply the todoRouter created
/// test by http://localhost:8080/todos
/// test by http://localhost:8080/todos/add-todos
app.use("/todos", TodoRouter);
app.use("/posts", PostRouter);

// Handling Undefined Routes
app.use((req,res)=>{
    res.status(404).json({message:"This request is not found"})
})
app.listen(8080, () => {
  console.log("Server Started");
});
