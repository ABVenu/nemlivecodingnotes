const mongoose = require("mongoose");



const rentalTransactionSchema = new mongoose.Schema({
    startDate:Date,
    endDate:Date,
    rentAmt:Number,
    paymentStatus:{type:Boolean, default:false},
    rentedBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    applianceId:{type:mongoose.Schema.Types.ObjectId, ref:"Appliance"}
})

const rentalTransactionModel = mongoose.model("RentalTransaction", rentalTransactionSchema);


module.exports = rentalTransactionModel;