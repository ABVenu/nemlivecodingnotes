/// exploring events
const EventEmitter = require("events");
const event = new EventEmitter();


/// event listener 
event.on("eventNumber1", ()=>{
    console.log("This is fist event in the Nodejs")
})
/// DOM
// button.addEventListener("click", ()=>{
//     console.log("Button is clicked")
// })
/// Trigger the event
event.emit("eventNumber1") 