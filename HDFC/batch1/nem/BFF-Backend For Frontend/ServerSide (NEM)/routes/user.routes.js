import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
const saltRounds = Number(process.env.SALT_ROUNDS);
// console.log(saltRounds)
export const UserRouter = express.Router();
// Signup route
// email and password from req.body
UserRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    let myPlaintextPassword = password; // from user via FE
    /// General logic store in DB
    // let user = await UserModel.create({email, password}) // X X X X
    /// Hash the password first then store in the DB
    bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        throw new Error("Something Went Wrong Please Try Again Later");
      }
      console.log("raw password", myPlaintextPassword);
      console.log("hashed password", hash);
      ///if no error-->  hash generated. --> store in db
      let user = await UserModel.create({ email, password: hash });
      res.status(201).json({ message: "Signup Sucess, Please login" });
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again later" });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    /// email and password from req.body
    /// find the user first, if present comapare the password or not present, user not found
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    ///console.log(user);
    if (!user) {
      res.status(404).json({ message: "User Not Registered, Please signup" });
      return;
    }
    /// user found
    /// compare the hashed password from DB and raw password from req.body
    let myPlaintextPassword = password; /// Password coming from Body
    let hash = user.password; /// hashed password stored in DB
    bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
      if (err) {
        throw new Error("Something Went Wrong Please Try Again Later");
      }
      // console.log("result", result);
      if (result) {
        /// password is right
        var token = jwt.sign({ userId: user._id }, 'shhhhh');
        console.log("token", token)
       // res.cookie
        res.status(200).json({ message: "Login Success", token });
      } else {
        // result is false, wrong password
        res.status(400).json({ message: "Wrong Password" });
      }r
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, Please try again later" });
  }
});
