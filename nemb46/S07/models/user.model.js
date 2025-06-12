const mongoose = require("mongoose");

/// addressSchema is called as Subdocument 
const addressSchema = new mongoose.Schema({
      houseNumber: String,
      area: String,
      landmark: String,
      tehsil: String,
      district: String,
      state: String,
      pincode: String,
      mobileNumber: String,
    })



const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // required
  email: { type: String, required: true, unique: true }, // unique  // need to verify once again
  age: { type: Number, min: 18, max: 100 }, // min max
  isMarried: { type: Boolean, default: false }, // deafult
  gender: { type: String, enum: ["male", "female"] },
  address: [addressSchema],  // embedded Schema 
  orders:[{ // orders is nested Schema
    orderValue:Number,
    paymentMethod:{type:String, enum:["COD", "UPI"]},
    deliveryStatus:{type:Boolean, default:false}
  }]
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
