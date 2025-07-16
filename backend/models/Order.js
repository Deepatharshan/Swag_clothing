// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userInfo: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    countryCode: { type: String, required: true },
  },
  items: [
    {
      name: String,
      size: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["Online", "OnShop"], required: true },
  paymentStatus: { type: String, enum: ["Success", "Pending", "Failed"], default: "Pending" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
