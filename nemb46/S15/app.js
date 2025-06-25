/// exploring events with the help of HTTP module
// also experiencing pain/drawback of HTTP module

const http = require("http");  
// Inbuilt module of node js which can take req and give the response
const server = http.createServer((req,res)=>{
    if(req.url == "/home"){
        res.end("This is home page")
    }else if(req.url == "/addtodos" && req.method=="POST"){
        // how body is getting in case of http
        console.log(req.body)
        let body = "";
        /// listen to the event called as data
        req.on("data", (data)=>{
            body+= data
        })
        console.log("body after data event",body)
        /// end event, it is telling end of data sent as body
        req.on("end", ()=>{
            console.log("Body", body)
        })
        res.end("Todo Added")
    }
});


server.listen(8000, ()=>{
    console.log("HTTP Server started")
})