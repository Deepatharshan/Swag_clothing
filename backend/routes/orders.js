// routes/orders.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST - Create new order
router.post("/", async (req, res) => {
  try {
    const order = new Order({
      userInfo: req.body.userInfo,
      items: req.body.items,
      total: req.body.total,
      paymentMethod: req.body.paymentMethod,
      paymentStatus: req.body.paymentStatus,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("Order save error:", err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

// Other routes...
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Error fetching order" });
  }
});

router.put("/:id/payment", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to update payment status" });
  }
});

module.exports = router;
