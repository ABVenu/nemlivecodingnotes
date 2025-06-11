const mongoose = require("mongoose");
const express = require("express");
// connect the local mongo to Nodejs
/// fetch, which async operation
mongoose
  .connect("mongodb://127.0.0.1:27017/nemb46test")
  .then(() => {
    console.log("Connected To DB");
  })
  .catch((err) => {
    console.log("Error in connecting DB");
  });

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  isMarried: Boolean,
  gender: String,
});

const UserModel = mongoose.model("User", userSchema);

const app = express();
app.use(express.json());

app.get("/allusers", async (req, res) => {
  let data = await UserModel.find();
  res.status(200).json({ message: "List of Users", users: data });
});
// async function getData(){
//     let data = await UserModel.find();
//     console.log("User Data", data)
// }
// getData()
app.post("/adduser", async (req, res) => {
  /// req.body is giving the user data
  let user = await UserModel.create(req.body); // .create accepts object, we know req.body is object, hence directly passed;
  res.status(201).json({ message: "User Added", user });
});
/// Insertdata
// async function insertData() {
//   await UserModel.insertMany([
//     { name: "Alice", age: 34, isMarried: false, gender: "male" },
//   ]);
//   console.log("User Added");
// }
// insertData();

app.patch("/update-user/:userId", async (req, res) => {
  /// userId is coming from path params & data to be updated is coming from req.body

  const { userId } = req.params; // destrcuture userId
  let user = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });
  res.status(201).json({ message: "User Updated", user });
});
// async function updateData(){
//     await UserModel.findByIdAndUpdate("68492ad6edeff221fa5f8eb8",{name:"Princess Diana"})
//     console.log("Data Updated")
// }
// updateData()

app.listen(8000, () => {
  console.log("Server Started");
});
