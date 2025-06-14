const mongoose = require("mongoose");


const applianceSchema = new mongoose.Schema({
    name:String,
    specifications:String, 
    isAvailable:{type:Boolean, default:true},
    rentPrice:{type:Number, min:100},
    minRentPeriod:{type:Number, default:7}
})
    

const ApplianceModel = mongoose.model("Appliance", applianceSchema);

module.exports = ApplianceModel;