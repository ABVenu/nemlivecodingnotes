///  Dummy Auth Middleware
var jwt = require("jsonwebtoken");
const BlackListModel = require("../models/blacklistedToken.model");

const authMiddleware = async (req, res, next) => {
  /// token is passed through header,
  /// get the token from the header

  try {
    let token = req.headers.authorization?.split(" ")[1];
    // token blacklisting is to enhance security
    let blackListedToken = await BlackListModel.find({token})
    if (token) {
      // console.log(token);

      // once token is found, verify the token
      /// jwt has method called as verify
      var decoded = jwt.verify(token, process.env.JWT_SCERET_KEY);
      // attaching the userid to req body
      // for furthur operations in the protected route
      req.userId = decoded.userId;
      req.role = decoded.role;
      //console.log(decoded);
      next();
    } else {
      res.status(400).json({ message: "Token Not Found" });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Please Login Again..." });
  }
};

module.exports = authMiddleware;

// const authMiddleware = (req, res, next) => {
//   // for dummy token generated in sesson 10
//   // loginProof from body
//   // let userId = req.body.loginProof?.split(":")[1];
//   // if (userId) {
//   //   // attach the userId to the request object
//   //   req.userId = userId;
//   //   next();
//   // }else{
//   //   // No LoginProof

//   //   res.status(400).json({message:"Unauthorised"})
//   // }
// };
