const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/nemb46");
    console.log("Connected to DB");
  } catch (err) {
    console.log("Err in connecting DB");
  }
};

module.exports = connectToDB;
