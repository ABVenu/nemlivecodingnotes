const WebSocket = require("ws");
// Create a WebSocket server
const webSocketServer = new WebSocket.Server({ port: 8080 });
/// we need to write the events
/// first event is connecting to websocket server

// So webSocketServer should listen to the event connection
webSocketServer.on("connection", (client) => {
  // console.log(client)
  console.log("client Connected");
  // client are indiviual clients connected to this webSocketServer
  // if we want to communicate to these clients
  // we need to use client events or events to the clients
  client.send("Welcome to the chat application from server");

  client.on("message", (data) => {
    console.log("Message from Client", data.toString());
  });

  client.on("close", () => {
    console.log("Clinet Disconnected");
  });
});
console.log("WebSocket server is running on ws://localhost:8080");
