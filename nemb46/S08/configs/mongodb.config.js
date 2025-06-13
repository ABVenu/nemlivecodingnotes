const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    console.log("process.env.MONGO_URI", process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (err) {
    console.log("Err in connecting DB");
  }
};

module.exports = connectToDB;
