// // This file is just to learn the Redis & cron
require("dotenv").config()
const cron = require('node-cron');
const TodoModel = require('./models/todo.model');
const connectToDB = require('./configs/mongodb.config');

// cron.schedule('*/2 */13 * * *', () => {
//   console.log('running a task every minute');
// });


async function addManyTodos(){
  await connectToDB()
  try{
  await TodoModel.insertMany([{title:"Dummy Todo 1"},{title:"Dummy Todo 2",status:"asdfg"}])
  console.log("Todos Added")
  }catch(err){
    console.log("err", err)
  }
}


addManyTodos()






// const Redis = require("ioredis");
// const redis = new Redis(); /// This is equivalent to mongoose.connect


// redis.set("mykey", "value"); // Returns a promise which resolves to "OK" when the command succeeds.

// // ioredis supports the node.js callback style
// redis.get("mykey", (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result); // Prints "value"
//   }
// });