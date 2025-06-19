///  Dummy Auth Middleware

const authMiddleware = (req, res, next) => {
  // loginProof from body
   //
  let userId = req.body.loginProof?.split(":")[1];
  if (userId) {
    // attach the userId to the request object
    req.userId = userId;
    next();
  }else{
    // No LoginProof

    res.status(400).json({message:"Unauthorised"})
  }
};

module.exports = authMiddleware;
