// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const orderRoutes = require("./routes/orders");
const financeRoutes = require("./routes/finance");
const authRoutes = require('./routes/auth');
const statsRoutes = require("./routes/stats");
const usersRoutes = require("./routes/users");

const app = express();

// === Middleware ===
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Handle large payloads like base64 images

// === MongoDB Connection ===
mongoose.connect(
  "mongodb+srv://panchdeepan147:Ohvb36h333Jh9eS3@swag.v4tcb1d.mongodb.net/clothify?retryWrites=true&w=majority&appName=Swag",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// === Cloth Schema & Model ===
const clothSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [String],
  description: String,
  image: String, // Can be a base64 or image URL
});

const Cloth = mongoose.model("Cloth", clothSchema);

// === Cloth Routes ===
app.get("/api/clothes", async (req, res) => {
  try {
    const clothes = await Cloth.find();
    res.json(clothes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/clothes/:id", async (req, res) => {
  try {
    const cloth = await Cloth.findById(req.params.id);
    if (!cloth) return res.status(404).json({ message: "Cloth not found" });
    res.json(cloth);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/clothes", async (req, res) => {
  try {
    const cloth = new Cloth(req.body);
    await cloth.save();
    res.status(201).json(cloth);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/api/clothes/:id", async (req, res) => {
  try {
    const updated = await Cloth.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Cloth not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/clothes/:id", async (req, res) => {
  try {
    const deleted = await Cloth.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Cloth not found" });
    res.json({ message: "Cloth deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// === API Routes ===
app.use("/api/orders", orderRoutes);     // Order operations
app.use("/api/finance", financeRoutes);  // Finance management (income/expenses)
app.use("/api/auth", authRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/users", usersRoutes);

// === Start Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
