const roleBasedAccessControl = (...role) => {
  /// rest operator

  return (req, res, next) => {
    //console.log("hello");
   //console.log(role);
    if (role.includes(req.role)) {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  };
};

module.exports = roleBasedAccessControl;
