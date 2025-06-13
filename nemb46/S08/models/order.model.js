const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderValue: Number,
  paymentMethod: { type: String, enum: ["COD", "UPI"] },
  deliveryStatus: { type: Boolean, default: false },
  orderedBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"}, // linked with User Collection
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
