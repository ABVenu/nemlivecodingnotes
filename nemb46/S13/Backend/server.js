require("dotenv").config()
const express = require("express");
const connectToDB = require("./configs/mongodb.config");
const UserRouter = require("./routes/user.routes");
const TodoRouter = require("./routes/todo.routes");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors())
// DB Connection
connectToDB();
// Test Route
app.get("/test", (req, res) => {
  try {
    res.status(200).json({ message: "This is test route" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

/// User router
app.use("/users", UserRouter);

// Todo Router 
app.use("/todos", TodoRouter)

/// Handling undefined route
app.use((req, res) => {
  res.status(404).json({ message: "This is request is not defined" });
});

app.listen(8000, () => {
  console.log("Server started");
});
