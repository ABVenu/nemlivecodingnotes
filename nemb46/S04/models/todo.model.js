

const fs = require("fs");


const getData = ()=>{
      let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
      let todos = data.todos;

      return {data,todos}
}

const addOrUpdateData  = (data)=>{
    fs.writeFileSync("./db.json", JSON.stringify(data));
}

module.exports = {getData, addOrUpdateData}