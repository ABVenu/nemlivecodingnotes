const fs = require("fs");
const { getData, addOrUpdateData } = require("../models/todo.model");
const getTodos =  (req, res) => {
  /// send the todos are response
  let data = getData().data;  
  let todos = data.todos;
  res.status(200).json({ message: "List Of Todos", todos });
}


const addTodos = (req, res) => {
  let data = getData().data;
  let todos = data.todos;
  let newId = todos[todos.length - 1].id + 1;
  todos.push({ ...req.body, id: newId });
  addOrUpdateData(data);
  res.json({ message: "Todo Added" });
} 


const deleteTodos = (req, res) => {
  const todoId = req.params.todoId;
  let data = getData().data;
  let todos = data.todos;
  let index = todos.findIndex((todo, index) => todo.id == todoId);
  console.log(index);
  if (index == -1) {
    // todo not found
    res.status(404).json({ message: "Todo Not Found" });
  } else {
    // write a logic to remove the todo and send response
    let filteredData = todos.filter((todo) => todo.id != todoId);
    // replace/update filteredTodos as Todos in Data
    data.todos = filteredData;
    /// Rewrite the data into DB.json once again
    addOrUpdateData(data);
    res.status(200).json({ message: "Todo Deleted" });
  }
}


const updateTodos = (req, res) => {
  const todoId = req.params.todoId;
  let data = getData().data;
  let todos = data.todos;
  let index = todos.findIndex((todo, index) => todo.id == todoId);
  console.log(index);
  if (index == -1) {
    // todo not found
    res.json({ message: "Todo Not Found" });
  } else {
    // write a logic to replace old data with new data in the todo and send response
    let updatedData = todos.map((todo) => {
      if (todo.id != todoId) {
        // this is not the todo to be updated, return as it is
        return todo;
      } else {
        /// this is todo to be updated,
        /// use ... operator, spread old details and then new details and return todo
        return { ...todo, ...req.body };
      }
    });

    // replace/update upadted Todos as Todos in Data
    data.todos = updatedData;
    /// Rewrite the data into DB.json once again
    addOrUpdateData(data);

    res.json({ message: "Todo Updated" });
  }
}

module.exports = {getTodos,addTodos, deleteTodos,updateTodos}