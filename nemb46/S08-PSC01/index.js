require("dotenv").config()
const express = require("express");
const connectToDB = require("./configs/mongodb.config");
const UserRouter = require("./routes/user.routes");
const ApplianceRouter = require("./routes/appliance.routes");

const app = express();
app.use(express.json());

/// Connection to DB 
connectToDB()

/// Test Route
app.get("/test", (req, res) => {
  res.send("This is test route");
});

/// User Routes
app.use("/users", UserRouter)

// Appliance Routes
app.use("/appliance", ApplianceRouter)


/// Undefined Routes, at last
app.use((req, res) => {
  res.status(404).json({ message: "This route is undefined from index.js" });
});
app.listen(8000, () => {
  console.log("Server Started");
});
