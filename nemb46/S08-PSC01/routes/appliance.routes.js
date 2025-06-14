const express = require("express");
const ApplianceModel = require("../models/appliances.model");

const ApplianceRouter = express.Router();

// Create Appliance
ApplianceRouter.post("/add-applicance", async (req, res) => {
  /// name:specifications:isAvailable:rentPrice:minRentPeriod from req.body
  let appliance = await ApplianceModel.create(req.body);
  res.status(201).json({ message: "Appliance Created", details: appliance });
});
module.exports = ApplianceRouter;
