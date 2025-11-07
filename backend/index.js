// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ CORS setup for both dev and Docker
const allowedOrigins = [
  "http://localhost:5173",  // local dev
  "http://127.0.0.1:5173",  // alternative localhost
  "http://frontend:5173"    // Docker frontend container
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

/* ---------------- AUTH ------------------ */

// SIGN UP
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ status: "error", message: "All fields required" });

  try {
    const existingUser = await User.findOne({ email: email.trim() });
    if (existingUser) return res.status(400).json({ status: "error", message: "Email already registered" });

    const existingUsername = await User.findOne({ username: username.trim() });
    if (existingUsername) return res.status(400).json({ status: "error", message: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const newUser = new User({
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
      role: "user"
    });
    await newUser.save();

    res.json({ status: "success", message: "User created" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Signup failed", error: err.message });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ status: "error", message: "All fields required" });

  try {
    const user = await User.findOne({ username: username.trim() });
    if (!user) return res.status(401).json({ status: "error", message: "User not found" });

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) return res.status(401).json({ status: "error", message: "Invalid credentials" });

    res.json({
      status: "success",
      user: { id: user._id, username: user.username, role: "user" },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Login failed", error: err.message });
  }
});

/* ---------------- SERVER ------------------ */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
