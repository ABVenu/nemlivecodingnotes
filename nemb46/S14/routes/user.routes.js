const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const UserModel = require("../models/user.model");
const BlackListModel = require("../models/blacklistedToken.model");
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
      } else {
        // comparision is sucess, result id true or false
        // if result is true, right password
        /// if result is false, wrong password

        //console.log("result", result)

        if (result) {
          /// right password
          // provide something, which is proof of login for next protected routes

          // Dummy Token, just to understand how protected routes works
          ///let token1 = `loggedInUserId:${user._id}`; //this will be replaced with good secured token
          var token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SCERET_KEY,
            { expiresIn: 300 }
          );
          res.status(200).json({ message: "Login Sucess", token });
        } else {
          // wrong password
          res.status(403).json({ message: "Wrong Password" });
        }
      }
    });
  }
});

UserRouter.post("/logout", async (req, res) => {
  /// token is coming from headers
  let token = req.headers.authorization?.split(" ")[1];
  await BlackListModel.create({ token });
  res.status(200).json({ message: "User Logged Out...." });
});

/// Transporter is configuration
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ID_FOR_NODEMAILER,
    pass: process.env.PASSWORD_FOR_NODEMAILER,
  },
});
/// Dummy Route to check the nodemailer
UserRouter.get("/send-mail", async (req, res) => {
  const info = await transporter.sendMail({
    from: '"Venugopal" <venugopal@gmail.email>',
    to: "venugopal.burli@masaischool.com,twinklesahu130@gmail.com,sumitgourav07@gmail.com,faizanrahmankhan18@gmail.com",
    subject: "Hello ✔",
    text: "Hello world in the text format?", // plain‑text body
    // html: "<b>Hello world in the HTML format</b>", // HTML body
  });

  //console.log("Message sent:", info.messageId);
  res.status(200).json({ message: "Email Sent" });
});

/// Forget Password
UserRouter.post("/forget-password", async (req, res) => {
  /// email in the body
  /// check whether user is exists in DB
  // If yes, send him a resetpassword link
  /// if no, tell him to signup

  const { email } = req.body;
  let user = await UserModel.findOne({ email });

  if (!user) {
    // No User Found
    res.status(404).json({ message: "User Not Found, Please signup" });
  } else {
    /// user found
    /// send reset password link

    var token = jwt.sign({ userId: user._id }, process.env.JWT_SCERET_KEY, {
      expiresIn: 300,
    });

    // In case of FE Integration
    let resetLink = `http://127.0.0.1:5500/resetpassword.html?token=${token}`;

    // Pure Backend link
    //let resetLink = `http://localhost:8000/users/reset-password?token=${token}`;
    const info = await transporter.sendMail({
      from: '"Venugopal" <venugopal@gmail.email>',
      to: user.email,
      subject: "Password Reset",
      html: `<b>Hello user, Please find the reset password link,click to reset </b>
    <p>Rest Password Link: ${resetLink}</p>
    <h5>Please Note, Link Expires In 5 Mins</h5>`, // HTML body
    });
    res
      .status(200)
      .json({ message: "Password Reset Link Sent To Registered Mail" });
  }
});

/// reset password
UserRouter.patch("/reset-password", async (req, res) => {
  const { token } = req.query;
  /// verify the token update the password
  ///console.log(token)
  var decoded = jwt.verify(token, process.env.JWT_SCERET_KEY);
  if (decoded) {
    /// update the password
    let user = await UserModel.findById(decoded.userId);
    user.password = req.body.password;
    await user.save();
    // Black list the token
    let token = req.headers.authorization?.split(" ")[1];
    await BlackListModel.create({ token });

    res.status(200).json({ message: "Password Reset Sucessfull...Please Login Again" });
  }
});
module.exports = UserRouter;
