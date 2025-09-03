const http = require("http");
const cors = require("cors")
const express = require("express");
const { Server } = require("socket.io");

const app = express()
app.use(cors())
/// create server on http module and attach express app to that
const server = http.createServer(app);
/// create socket.io server on express app
const io = new Server(server,{
    cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  }
});

// keep clinetId and user name when user registers
let userObj = {};

let chatHistory = [];

/// start the server and start writing the events
// io is main chat/socket server
io.on("connection", (client)=>{
   // console.log(client.id)
   // console.log("client connected")
    /// use .on to listen the event 
    /// use emit to trigger the event 
    /// events are customised by you
    client.on("message", (message)=>{
       // console.log("Message from client", message);
        client.emit("thanks", "Message Received")
    })

    client.on("register", (userName)=>{
      //  console.log("username", userName)
      // storing username with client id in the user obj
        userObj[client.id] = userName;
        ///console.log(userObj)
        /// send the existing chat history to the client
        client.emit("chatHistory",chatHistory )

    })

    client.on("sendMessage", (message)=>{
        ///console.log(client.id, "-->", message);
        // let us create an chatObj and store in Chat History array
        let chatObj = {
            from: userObj[client.id],
            message:message,
            date:Date.now()
        }
        chatHistory.push(chatObj);
        //console.log(chatHistory)
       // client.emit("chatHistory",chatHistory )
       // update the chatHistory to all users, when someone chats
       io.emit("chatHistory",chatHistory )
    })
})

////
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

