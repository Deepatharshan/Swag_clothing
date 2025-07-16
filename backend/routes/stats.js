const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // replace with your real model
const Finance = require("../models/FinanceEntry"); // replace if you have
// Note: adjust model names/paths if needed

// Orders per month
router.get("/orders-per-month", async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: { $substr: ["$createdAt", 0, 7] }, // '2025-07'
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get orders stats" });
  }
});

// Finance per month (income / expenses)
router.get("/finance-per-month", async (req, res) => {
  try {
    const finance = await Finance.aggregate([
      {
        $group: {
          _id: { $substr: ["$createdAt", 0, 7] },
          income: { $sum: "$income" },
          outcome: { $sum: "$outcome" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(finance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get finance stats" });
  }
});

module.exports = router;
