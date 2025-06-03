// inbuilt modules -->import and use
const os = require("os");  /// os inbuilt module is imported from Node JS software
const fs = require("fs")
// console.log(os.cpus().length)
/// Read the file
let data = fs.readFileSync("./data.txt", {encoding:"utf-8"})
console.log(data)

/// write the file
fs.writeFileSync("./data1.txt", "This is first data that is added through write file")
console.log("File Written")


// Append file--> updates the data/ adds data into existing file
fs.appendFileSync("./data1.txt", "\nThis is next set of data added through append file")
console.log("File Appended")

/// Making Changes in Line 1
let data1 = fs.readFileSync("./data1.txt", {encoding:"utf-8"})
data1 = data1.split("\n");
data1[0] = "This is new change";
data1 = data1.join("\n")
fs.writeFileSync("./data1.txt",data1 )
console.log("Data Appended in Line 1")

//Delete file
fs.unlinkSync("./data.txt");
console.log("File Deleted")



/// custom modules ---> create --> export --> import and use
// const sum = require("./sum");
// console.log(sum(3,4))