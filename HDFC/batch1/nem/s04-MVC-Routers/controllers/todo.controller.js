const { getData, addOrUpdateData } = require("../models/todo.model");



const getTodos =  (req, res) => {
  try {
    let data = getData()
    let todos = data.todos;
    res.status(200).json({ message: "Todos List", todos });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again later" });
  }
}

const addTodos = (req, res) => {
  let data = getData()
  let todos = data.todos;
  let newTodo = {
    ...req.body,
    completed: false,
    id: todos[todos.length - 1].id + 1,
  };
  //console.log(newTodo)
  todos.push(newTodo);
  /// update in the DB.json
  //  fs.appendFileSync("./db.json", JSON.stringify(data))
//   fs.writeFileSync("./db.json", JSON.stringify(data));
addOrUpdateData(data)
  //  console.log("todos", todos)
  res.json({ message: "todo added" });
}

const updateTodo = (req, res) => {
  /// todoId gives which todo to be updated
  /// req.body gives what to be updated
  const { todoId } = req.params;
  let data = getData()
  let todos = data.todos;
  let filteredTodo = todos.filter((todo) => todo.id == todoId);
  if (filteredTodo.length == 0) {
    res.status(404).json({ message: "Todo Not Found" });
  } else {
    /// todo found, now update todo in the db.json
    let updatedTodos = todos.map((todo) => {
      if (todo.id != todoId) {
        /// this is not taregetted todo, return as it is
        return todo;
      } else {
        /// this is the targetted, whose updation should happen & return
        return { ...todo, ...req.body };
      }
    });
    data.todos = updatedTodos;
    // fs.writeFileSync("./db.json", JSON.stringify(data));
    addOrUpdateData(data)
    res.json({ message: "Todo Updated" });
  }
}


const deleteTodo = (req, res) => {
  /// todoId gives which todo to be updated
  /// req.body gives what to be updated
  const { todoId } = req.params;
  let data =  getData()
  let todos = data.todos;
  let filteredTodo = todos.filter((todo) => todo.id == todoId);
  if (filteredTodo.length == 0) {
    res.send("Todo Not Found");
  } else {
    let remainingTodos = todos.filter((todo) => todo.id != todoId);
    data.todos = remainingTodos;
    addOrUpdateData(data)
    res.json({ message: "Todo Deleted" });
  }
}


module.exports = {getTodos, addTodos, updateTodo, deleteTodo}