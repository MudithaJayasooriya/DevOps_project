import express from "express";
import { signup, login } from "../controllers/userController.js";
import User from "../models/User.js";

const router = express.Router();

// Simple test endpoint
router.get("/test", (req, res) => {
  res.json({ status: "ok", message: "User routes working" });
});

// Test signup without bcrypt
router.post("/test-signup", async (req, res) => {
  try {
    console.log("Test signup:", req.body);
    const { username, email, password } = req.body;
    
    const newUser = new User({
      username,
      email,
      password: "test123" // plaintext for testing
    });
    
    await newUser.save();
    res.json({ status: "success", message: "Test user created" });
  } catch (err) {
    console.error("Test signup error:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.post("/signup", signup);
router.post("/login", login);

export default router;
