import jwt from "jsonwebtoken";

export const authMidlleware = (req, res, next) => {
  /// extract the token, then verfiy, if correct next
  // else back to login

  let token = req.headers?.authorization?.split(" ")[1];
  // console.log(token)
  if (!token) {
    res.status(400).json({ message: "Token Not Found, Please Login" });
  }
  try {
    var decoded = jwt.verify(token, "shhhhh");
    //   console.log(decoded)
    // attch the userId in the req so that it can be taken in the add todo route
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", errormessage: err.message });
  }
};
