import express from "express";
import User from "../models/user.js";

const router = express.Router();

/* ===========================
   AUTH ROUTE  ✅ NO CONFLICT
=========================== */
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    let user = await User.findOne({ email });

    // ✅ LOGIN
    if (user) {
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      if (user.role !== role) {
        return res.status(403).json({
          message: `You are registered as ${user.role}, not ${role}`
        });
      }

      return res.json({
        message: "Login successful",
        user
      });
    }

    // ✅ SIGNUP
    user = await User.create({
      email,
      password,
      role
    });

    return res.status(201).json({
      message: "Account created successfully",
      user
    });

  } catch (err) {
    console.error("AUTH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   GET USER BY ID
=========================== */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
