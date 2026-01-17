import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= Routes =================
app.use("/api/users", userRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 Calmana Backend Running");
});

// DEBUG: List all users
app.get("/test-users", async (req, res) => {
  try {
    const users = await mongoose.connection.db
      .collection("users")
      .find({})
      .toArray();

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= MongoDB Connection =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("📦 Connected DB Name:", mongoose.connection.name);
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ================= Server Start =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on http://0.0.0.0:${PORT}`);
});
