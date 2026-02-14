import bcrypt from "bcrypt";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load .env variables

// ------------------- SIGNUP -------------------
export const signup = async (req, res) => {
  console.log("Request body:", req.body);
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ status: "error", message: "All fields required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const newUser = new User({
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ status: "success", message: "User created" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Signup failed", error: err.message });
  }
};

// ------------------- LOGIN -------------------
export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ status: "error", message: "All fields required" });

  try {
    // ✅ Check admin credentials from .env
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        status: "success",
        user: { username: "admin", role: "admin" },
      });
    }

    // ✅ Regular user login
    const user = await User.findOne({ username: username.trim() });
    if (!user)
      return res.status(401).json({ status: "error", message: "User not found" });

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch)
      return res.status(401).json({ status: "error", message: "Invalid credentials" });

    res.json({
      status: "success",
      user: { id: user._id, username: user.username, role: "user" },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Login failed", error: err.message });
  }
};
