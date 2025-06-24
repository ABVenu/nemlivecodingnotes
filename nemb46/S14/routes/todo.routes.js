const express = require("express");
const TodoModel = require("../models/todo.model");
const authMiddleware = require("../middleware/auth.middleware");
const roleBasedAccessControl = require("../middleware/roleCheck.middleware");
const redis = require("../configs/redis.config");
const cron = require("node-cron");

const TodoRouter = express.Router();

/// This is protected route
/// only logged in Users should be able use the route
TodoRouter.post(
  "/add-todo",
  authMiddleware,
  roleBasedAccessControl("admin", "user"),
  async (req, res) => {
    // title, loginProof

    // req.userId is given by AuthMiddleware
    let todo = await TodoModel.create({
      title: req.body.title,
      createdBy: req.userId,
    });
    // handling side effect or clear the old todos set in the Redis
    await redis.del(req.userId);
    res.status(201).json({ message: "Todo Added", todo });
  }
);
// Get My Todos, protected Route

TodoRouter.get(
  "/my-todos",
  authMiddleware,
  roleBasedAccessControl("admin", "user", "external", "internal"),
  async (req, res) => {
    /// apply caching for this route using redis
    // if data is given for first time, then get data form DB store in Redis
    // & give the response
    /// from second time, give the redis from redis itself
    let cachedTodos = await redis.get(req.userId);
    console.log(cachedTodos);
    //res.send("Hi")
    if (cachedTodos) {
      let todos = JSON.parse(cachedTodos);
      console.log(todos);
      // data is present in the redis
      res.json({ message: "Data from Redis", todos });
    } else {
      /// data is not present in the Redis
      let todos = await TodoModel.find({ createdBy: req.userId });
      // store the data in the redis
      redis.set(req.userId, JSON.stringify(todos), "EX", 30);
      res.status(200).json({ message: "Data from MongoDB", todos });
    }
  }
);

// Admins can see everyone's todos
TodoRouter.get(
  "/alltodos",
  authMiddleware,
  roleBasedAccessControl("admin"),
  async (req, res) => {
    let todos = await TodoModel.find();
    res.status(200).json({ message: "Todos List", todos });
  }
);

/// Integration use case of Redis and Cron
/// Bulk Addition of Todos, 100 todos at a time
/// Give the response immediately, Todos addition is on process,
// Store all the Bulk todos in Redis,
// let a cron run for every 2 mins, which adds all todos in a go

TodoRouter.post(
  "/bulk-add-todo",
  authMiddleware,
  roleBasedAccessControl("admin", "user"),
  async (req, res) => {
    // take the bulk todos and set in the Redis
    // req.body is array of todos
    await redis.set("bulkAddTodos", JSON.stringify(req.body));
    res.status(201).json({
      message:
        "Todos addition is on process, don't worry we will get back soon",
    });
  }
);

cron.schedule("*/1 * * * *", async () => {
  console.log("Cron Started");
  let todosToeBeAdded = await redis.get("bulkAddTodos");
  if (todosToeBeAdded) {
    todosToeBeAdded = JSON.parse(todosToeBeAdded);
    await TodoModel.insertMany(todosToeBeAdded);
    await redis.del("bulkAddTodos")
    console.log("Todos added in bulk, cron ended");
  } else {
    console.log("No Bulk Todos in Redis");
  }
});
module.exports = TodoRouter;
