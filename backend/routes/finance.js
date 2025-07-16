const express = require("express");
const router = express.Router();
const FinanceEntry = require("../models/FinanceEntry");

// GET all finance entries
router.get("/", async (req, res) => {
  try {
    const entries = await FinanceEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch finance entries" });
  }
});

// POST new entry
router.post("/", async (req, res) => {
  try {
    const entry = new FinanceEntry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: "Failed to create entry" });
  }
});

// PUT update entry
router.put("/:id", async (req, res) => {
  try {
    const entry = await FinanceEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) return res.status(404).json({ error: "Entry not found" });
    res.json(entry);
  } catch (err) {
    res.status(400).json({ error: "Failed to update entry" });
  }
});

// DELETE entry
router.delete("/:id", async (req, res) => {
  try {
    const entry = await FinanceEntry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ error: "Entry not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete entry" });
  }
});

module.exports = router;
