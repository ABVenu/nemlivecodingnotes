const UserModel = require("../models/user.model");


const addUser = async (req, res) => {
  /// req.body is giving the user data
  let user = await UserModel.create(req.body); // .create accepts object, we know req.body is object, hence directly passed;
  res.status(201).json({ message: "User Added", user });
}


module.exports = {addUser}