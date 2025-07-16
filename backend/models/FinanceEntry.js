const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema({
  type: { type: String, enum: ["Income", "Expense"], required: true },
  amount: { type: Number, required: true },
  description: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FinanceEntry", financeSchema);
