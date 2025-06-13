const express = require("express");
const OrderModel = require("../models/order.model");

const OrderRouter = express.Router();

OrderRouter.post("/add-order", async (req, res) => {
  /// Order details orderValue,paymentMethod,deliveryStatus,orderedBy
  let order = await OrderModel.create(req.body);
  res.status(201).json({ message: "Order Placed", details: order });
});

OrderRouter.delete("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  await OrderModel.findByIdAndUpdate(orderId);
  res.status(200).json({ message: "Order Deleted" });
});

OrderRouter.patch("/update-status/:orderId", async (req, res) => {
  const { orderId } = req.params;
  let order = await OrderModel.findById(orderId);
  order.deliveryStatus = true;
  await order.save();
  res.status(200).json({ message: "Order Delivered" });
});

/// Get Orders by User Id
OrderRouter.get("/my-orders/:userId", async (req, res) => {
  const { userId } = req.params;
  let orders = await OrderModel.find(
    { orderedBy: userId },
    { orderedBy: 0, __v: 0 }
  );
  let totalSum = orders.reduce((acc, ele, i) => acc + ele.orderValue, 0);
  res
    .status(200)
    .json({ message: "Your Orders", totalOrderValue: totalSum, orders });
});

/// Get all orders
OrderRouter.get("/all-orders", async (req, res) => {
  let allOrders = await OrderModel.find().populate("orderedBy");
  // Populate just gets data form the ref mentioned in the Order Collection and adds in the query answer
  res.status(200).json({ message: "ALL Orders", allOrders });
});

/// Master Get Query, where searching, sorting, pagination is applied through query
// It is nothing to do with relationship
OrderRouter.get("/", async (req, res) => {
  const { userId } = req.params;
  const { page, limit, sort, order, paymentMethod } = req.query;
  // console.log(sort, order)

  // .skip, .limit, .sort are called as cursor methods
  let skippedItems = (page - 1) * limit;
  let orders = await OrderModel.find(
    {
      $and: [
        { orderedBy: userId },
        { paymentMethod: { $regex: paymentMethod, $options: "i" } },
      ],
    },
    { orderedBy: 0, __v: 0 }
  )
    .skip(skippedItems)
    .limit(limit)
    .sort({ [sort]: order == "asc" ? 1 : -1 });
  let totalSum = orders.reduce((acc, ele, i) => acc + ele.orderValue, 0);
  res
    .status(200)
    .json({ message: "Your Orders", totalOrderValue: totalSum, orders });
});
module.exports = OrderRouter;
