// inbuilt modules -->import and use
const os = require("os"); /// os inbuilt module is imported from Node JS software
const fs = require("fs");
// console.log(os.cpus().length)
/// Read the file

///console.log(process.argv)
let command = process.argv[2];
let filePath = process.argv[3];
let dataSent = process.argv[4];

//console.log(command, filePath, dataSent);

if (command == "read") {
  readFile(filePath);
} else if (command == "create") {
  createFile(filePath, dataSent);
} else if (command == "update") {
  updateFile(filePath, dataSent);
} else if (command == "delete") {
  deleteFile(filePath);
}

function readFile(filePath) {
  let data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log(data);
}

function createFile(filePath, dataSent) {
  /// write the file
  fs.writeFileSync(filePath, dataSent);
  console.log("File Written");
}

function updateFile(filePath, dataSent) {
  // Append file--> updates the data/ adds data into existing file
  fs.appendFileSync(filePath, `\n${dataSent}`);
  console.log("File Appended");
}

// /// Making Changes in Line 1
// let data1 = fs.readFileSync("./data1.txt", {encoding:"utf-8"})
// data1 = data1.split("\n");
// data1[0] = "This is new change";
// data1 = data1.join("\n")
// fs.writeFileSync("./data1.txt",data1 )
// console.log("Data Appended in Line 1")

//Delete file

function deleteFile(filePath) {
  fs.unlinkSync(filePath);
  console.log("File Deleted");
}

/// custom modules ---> create --> export --> import and use
// const sum = require("./sum");
// console.log(sum(3,4))


/// Extenal Modules
var isEven = require('is-even');
const cowsay = require("cowsay");

console.log(cowsay.say({
    text : "This is first external module",
    e : "()()",
    T : "W "
}));