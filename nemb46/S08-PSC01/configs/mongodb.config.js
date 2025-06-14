const mongoose = require("mongoose");

const connectToDB = async () => {
    //    await mongoose.connect(process.env.MONGO_URI);
    // console.log("Connected To DB");
   try {
 await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To DB");
  } catch (err) {
     console.log("Err In Connecting DB");
   }
};
//connectToDB()
module.exports = connectToDB;
