const fs = require("fs")

const loggerMiddleware = (req,res,next)=>{
    let data = `\nReq url: ${req.url} | Method:${req.method} | Time: ${Date.now()}`
    fs.appendFileSync("./logs.txt", data)
    next()
}

module.exports = loggerMiddleware