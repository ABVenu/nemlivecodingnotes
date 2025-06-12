const express = require("express");
const UserModel = require("../models/user.model");
const { addUser } = require("../controllers/user.controllers");

const UserRouter = express.Router();
UserRouter.get("/allusers", async (req, res) => {
  let data = await UserModel.find();
  res.status(200).json({ message: "List of Users", users: data });
});

UserRouter.post("/adduser",addUser );

UserRouter.patch("/update-user/:userId", async (req, res) => {
  /// userId is coming from path params & data to be updated is coming from req.body
  const { userId } = req.params; // destrcuture userId
  let user = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });
  res.status(201).json({ message: "User Updated", user });
});


/// Add address to existing user
UserRouter.patch("/addaddress/:userId", async (req,res)=>{
    // userId comes from params
    // new address object comes from body
    const {userId} = req.params;
    // let user = await UserModel.findByIdAndUpdate(userId, req.body);
    // findByIdAndUpdate will not work for nested updations
    let user = await UserModel.findById(userId);
   /// console.log("user", user)
    user.address.push(req.body)
    // save the user once address is added
    await user.save(); /// Imp feature .save() given by mongoose
    res.status(201).json({message:"Address Added"})
})
// Deleting an existing address?? what is method?? patch or delete??

// Method to add/Post a order??
UserRouter.patch("/add-order/:userId", async (req,res)=>{
    /// orderValue, paymentMethod, deliveryStatus comes from request.body
    // Push into orders array of the user
     const {userId} = req.params;
    let user = await UserModel.findById(userId);
    user.orders.push(req.body)
    await user.save(); 
    res.status(201).json({message:"Order Added"})
})

//Update an deliverystatus
UserRouter.patch("/:userId/orders/:orderId", async (req,res)=>{
    // Push into orders array of the user
   // console.log(req.params);
   const {userId,orderId } = req.params;
    let user = await UserModel.findById(userId);
    // .lean() converts documents to objects, just to console and show the data
    let updtedOrderArray = user.orders.map((order)=>{
        if(order._id == orderId){
            return {...order, deliveryStatus:true}
        }else{
            return order
        }
    })
    user.orders = updtedOrderArray;
    await user.save();
   // await UserModel.findByIdAndUpdate(userId, user), if you are using .lean()
    res.json({message:"Order Status Updated"})
   
}) 
module.exports = UserRouter;
