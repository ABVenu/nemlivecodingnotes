import jwt from "jsonwebtoken";

// export const authMidlleware = (role) => {
//   console.log("role", role)
//   return (req, res, next) => {
//     /// extract the token, then verfiy, if correct next
//     // else back to login

//     let token = req.headers?.authorization?.split(" ")[1];
//     // console.log(token)
//     if (!token) {
//       res.status(400).json({ message: "Token Not Found, Please Login" });
//     }
//     try {
//       var decoded = jwt.verify(token, "shhhhh");
//       //console.log("decoded", decoded)
//       console.log("allowed role", role, "role in the token", decoded.role)
//       // once token is decoded, then check the role
//       if (role.includes(decoded.role)) {
        
//         req.userId = decoded.userId;
//         next();
//       }else{
//         /// role not matching 
//         res.status(401).json({message:"Unauthorised"})
//       }
//     } catch (err) {
//       res
//         .status(500)
//         .json({ message: "Something went wrong", errormessage: err.message });
//     }
//   };
// };

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
    //req.userId = decoded.userId;
    /// new thing added in authorization
    //req.userRole = decoded.role;
    req.user = {userId:decoded.userId, role:decoded.role}
    next();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", errormessage: err.message });
  }
};

/// we should create a logic such that after token verfication,
/// verify role as well
