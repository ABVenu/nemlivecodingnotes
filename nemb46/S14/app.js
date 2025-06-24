// // This file is just to learn the Redis & cron

const cron = require('node-cron');

cron.schedule('*/2 */13 * * *', () => {
  console.log('running a task every minute');
});










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