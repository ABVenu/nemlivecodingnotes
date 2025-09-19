import express from "express"

import { addTodo, getAllTodos, markTodoCompleted, updateTodoById } from "../controllers/todo.controller.js";


export const TodoRouter = express.Router()

/// Create a post
TodoRouter.post("/add-todo", addTodo)


TodoRouter.get("/all-todos", getAllTodos )

TodoRouter.patch("/update-todo/:todoId", updateTodoById)

TodoRouter.patch("/mark-compeleted", markTodoCompleted )
