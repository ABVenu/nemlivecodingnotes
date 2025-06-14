const express = require("express");
const UserModel = require("../models/user.model");
const rentalTransactionModel = require("../models/rentalTransaction.model");
const ApplianceModel = require("../models/appliances.model");

const UserRouter = express.Router();

/// Create User

UserRouter.post("/add-user", async (req, res) => {
  try {
    /// I will get name, email, address (in the array) in the req.body
    let user = await UserModel.create(req.body);
    res.status(201).json({ message: "User Created", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
});

// Rent Applicance
/// rentedBy, ApplianceId, StartDate
UserRouter.post("/rent-appliance/:applianceId", async (req, res) => {
  try {
    // applianceId -> req.params
    // rentedBy & startdate -> req.body
    const { applianceId } = req.params;
    // check whether appliance is available
    let appliance = await ApplianceModel.findById(applianceId);
    if (appliance.isAvailable == true) {
      /// Appliance is available
      let rentData = { ...req.body, applianceId };
      let data = await rentalTransactionModel.create(rentData);
      /// Change the appliance's is available status to false
      appliance.isAvailable = false;
      await appliance.save();
      res.status(201).json({ message: "Applinace Rented Sucessfully", data });
    } else {
      /// Appliance is not available
      res.status(404).json({ message: "Appliance Not Available" });
    }
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Something went wrong in Renting, please try again later",
      });
  }
});

// Return the appliance
UserRouter.patch("/return-appliance/:applianceId", async (req, res) => {
  /// applianceId & endDate is the required data
  const { applianceId } = req.params;
  // check whether appliance is available
  let appliance = await ApplianceModel.findById(applianceId);
  if (appliance.isAvailable) {
    /// Appliance is available, it is not rented
    res.status(400).json({ message: "This Appliance is not rented" });
  } else {
    // Appliance is rented
    // make the isAvailable status to true
    // find the days and calculate the rent
    // No of days between start and enddate & multipy by the rent price
    // how to get start date??
    let rentalTransaction = await rentalTransactionModel.find({ applianceId });
    //console.log(rentalTransaction)
    let endDateFormat = new Date(req.body.endDate)
    let noOfDays = endDateFormat.getDate() - rentalTransaction[0].startDate.getDate();
    // console.log(endDateFormat.getDate(), rentalTransaction[0].startDate.getDate(), noOfDays);
    let rentAmt = appliance.rentPrice * noOfDays;
   /// console.log(rentAmt)
    // Upadte the enddate& rent amt in the rentalTranscation document,
    // also make is available true in the appliance
    rentalTransaction[0].endDate = req.body.endDate;
    rentalTransaction[0].rentAmt = rentAmt;
    appliance.isAvailable = true;
    ///console.log(rentalTransaction)
    await rentalTransaction[0].save();
    await appliance.save();
    res
      .status(200)
      .json({
        message: `Appliance Returned Successfully, Please pay the Rent Amt of Rs.${rentAmt}`,
      });
  }
});

// Get My Rentals Details

UserRouter.get("/my-rentals/:userId", async (req,res)=>{
   let rentedBy = req.params.userId;
   let data = await rentalTransactionModel.find({rentedBy})
   res.status(200).json({message:"Rental Data", data})
})

module.exports = UserRouter;
