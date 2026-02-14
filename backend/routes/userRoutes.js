import express from "express";
import { signup, login } from "../controllers/userController.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Test endpoint to verify bcrypt is working
router.get("/test", async (req, res) => {
  try {
    const hash = await bcrypt.hash("test123", 10);
    res.json({ status: "ok", message: "bcrypt working", hash });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.post("/signup", signup);
router.post("/login", login);

export default router;
