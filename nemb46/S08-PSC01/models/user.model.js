const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  receieverName: String,
  houseNo: String,
  street: String,
  tehsil: String,
  district: String,
  state:String,
  pincode: String,
  mobileNumber: String,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: [addressSchema], // One user can have many address
});


const UserModel = mongoose.model("User",userSchema )

module.exports = UserModel;