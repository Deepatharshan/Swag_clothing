const express = require("express");
const router = express.Router();
const User = require("../models/User"); // replace with your real model

// Get all users (for dashboard)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "name email createdAt").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get users" });
  }
});

module.exports = router;
