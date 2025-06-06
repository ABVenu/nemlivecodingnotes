const fs = require("fs")
const loggerMiddleware = (req,res,next)=>{
  let data = `\n Method: ${req.method} | url:${req.url} | Time: ${new Date()}`;
  fs.appendFileSync("./logs.txt", data)
  //console.log(data)
  console.error(data);
   console.warn("This action is deprecated");

  next()
}

/// These are custom middleware
module.exports = loggerMiddleware