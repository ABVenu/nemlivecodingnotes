const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json()); // sense the incoming json body
app.get("/home", (req, res) => {
  res.send("This is home page");
});

app.post("/adddata", (req, res) => {
  res.json({ message: "Post Request Received....1" });
});

app.post("/adddata", (req, res) => {
  res.json({ message: "Post Request Received....2" });
});

app.delete("/deletedata", (req, res) => {
  res.json({ message: "Delete Request Received" });
});
/// Todo Routes
/// Get Todos

app.get("/all-todos", (req, res) => {
  /// send the todos are response
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  //console.log(data.todos);
  let todos = data.todos;
  res.json({ message: "List Of Todos", todos });
});

/// Post request which adds data into DB
app.post("/add-todo", (req, res) => {
  // first console and check the incoming body sent by client
  //console.log(req.body);

  // push the incoming todo into DB.json and then send response
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  // id of last element in todos array+1 will be newId for incoming todo
  let newId = todos[todos.length - 1].id + 1;
  todos.push({ ...req.body, id: newId });
  //console.log(data)
  // Rewrite entire data once again in db.json
  fs.writeFileSync("./db.json", JSON.stringify(data));
  res.json({ message: "Todo Added" });
});

app.delete("/delete-todo/:todoId", (req, res) => {
  console.log(req.params);
  // const {todoId} = req.params;
  const todoId = req.params.todoId;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  // check whether todo of particular todoId is present in DB
  let index = todos.findIndex((todo, index) => todo.id == todoId);
  console.log(index);
  if (index == -1) {
    // todo not found
    res.json({ message: "Todo Not Found" });
  } else {
    // write a logic to remove the todo and send response
    let filteredData = todos.filter((todo) => todo.id != todoId);

    // replace/update filteredTodos as Todos in Data
    data.todos = filteredData;
    /// Rewrite the data into DB.json once again
    fs.writeFileSync("./db.json", JSON.stringify(data));

    res.json({ message: "Todo Deleted" });
  }
});

app.patch("/update-todo/:todoId", (req, res) => {
 // console.log(req.params);
  // const {todoId} = req.params;
  // req.body is the changes comming for the todo of todaId
  const todoId = req.params.todoId;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  // check whether todo of particular todoId is present in DB
  let index = todos.findIndex((todo, index) => todo.id == todoId);
  console.log(index);
  if (index == -1) {
    // todo not found
    res.json({ message: "Todo Not Found" });
  } else {
    // write a logic to replace old data with new data in the todo and send response
    let updatedData = todos.map((todo) => {
        if(todo.id!= todoId){
            // this is not the todo to be updated, return as it is
            return todo
        }else{
             /// this is todo to be updated,
             /// use ... operator, spread old details and then new details and return todo
             return {...todo,...req.body} 
        }
    });

    // replace/update upadted Todos as Todos in Data
    data.todos = updatedData;
    /// Rewrite the data into DB.json once again
    fs.writeFileSync("./db.json", JSON.stringify(data));

    res.json({ message: "Todo Updated" });
  }
});


app.listen(8000, () => {
  console.log("Server started");
});
