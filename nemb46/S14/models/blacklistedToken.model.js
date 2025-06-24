const mongoose = require("mongoose");


const blackListSchmea = new mongoose.Schema({
    token:String,
})

const BlackListModel = mongoose.model("BlackListedToken", blackListSchmea);

module.exports = BlackListModel;