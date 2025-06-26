const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();  /// I need express app but not express server, hence no app.listen
const cors = require("cors")
/// http server as well, since sockets are upgarded http protocol
const server = http.createServer(app)
/// http's server runs over express app, so that i can apply middleware in future

const io = new Server(server,{
    cors:{
        origin:"http://127.0.0.1:5500",
        methods:["GET", "POST"]
    }
}); /// Socket.io's server is created over http server
app.use(cors())
//// socket events here, io is the main chat server 

let usersObj = {};
let chatHistory = []; // chatobjects will be pushed
io.on("connection", (socket)=>{
    ///socket means client
    //console.log("socket connected", socket.id);
    socket.on("registerName", (name)=>{
        usersObj[socket.id] = name;
        io.emit("chatHistory", chatHistory); // sends message to all sockets

         //console.log(usersObj)
    })

    socket.on("sendMessage", (message)=>{
        //console.log(usersObj[socket.id], message)
        //let name = usersObj[socket.id]
        // push this chat message to chatHistory Array
        let chat = {name:[usersObj[socket.id]],
            message:message}
        chatHistory.push(chat);
        console.log(chatHistory);
        // socket.emit("chatHistory", chatHistory); // this sends message to the same user not to everyone
        io.emit("chatHistory", chatHistory); // sends message to all sockets
    })
})

server.listen(9000, ()=>{
    console.log("Server Started ")
})