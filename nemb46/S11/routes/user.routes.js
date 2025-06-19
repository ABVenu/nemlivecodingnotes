const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const saltRounds = 8;

const UserRouter = express.Router();

// Signup Route

UserRouter.post("/signup", (req, res) => {
  try {
    /// name, email and password from the req.body
    // password from body is raw password
    // hash the password before storing into the DB
    let myPlaintextPassword = req.body.password;
    bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        /// error occured
        res
          .status(500)
          .json({ message: "Something went wrong please try again later" });
      } else {
        /// hash is generated not error
        //console.log("raw password -->", myPlaintextPassword,"-->Hashed password-->", hash)

        await UserModel.create({ ...req.body, password: hash });
        res.status(201).json({ message: "Signp Success" });
      }
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong please try again later" });
  }
});

UserRouter.post("/login", async (req, res) => {
  /// email and raw password given by the user
  // get the user fron DB and then comapare the passwords,
  // if comaparision is sucess, then login sucess
  // or else wrong password
  const { email, password } = req.body;
  let user = await UserModel.findOne({ email });
  if (!user) {
    // user not found
    res.status(404).json({ message: "User Not Found, Please Signup.." });
  } else {
    /// user found, now compare the password
    let hash = user.password; // hashed stored password from DB
    bcrypt.compare(password, hash, function (err, result) {
      // result == false
      if (err) {
        /// error occured
        res
          .status(500)
          .json({ message: "Something went wrong please try again later" });
      }else{
        // comparision is sucess, result id true or false
        // if result is true, right password
        /// if result is false, wrong password

        //console.log("result", result)

        if(result){
            /// right password
            // provide something, which is proof of login for next protected routes
            
            // Dummy Token, just to understand how protected routes works
            let token = `loggedInUserId:${user._id}`
            res.status(200).json({message:"Login Sucess", loginProof: token})
        }else{
            // wrong password
            res.status(403).json({message:"Wrong Password"})
        }
      }
    });
  }
});
module.exports = UserRouter;
