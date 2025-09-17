const fs = require("fs")


const getData = ()=>{
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

  return data
}


const addOrUpdateData = (data)=>{
    fs.writeFileSync("./db.json", JSON.stringify(data))
}


module.exports = {getData, addOrUpdateData}