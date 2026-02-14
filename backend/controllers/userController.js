import bcrypt from "bcrypt";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load .env variables

// ------------------- SIGNUP -------------------
export const signup = async (req, res) => {
  try {
    console.log("📝 Signup request received");
    console.log("   Body:", req.body);
    
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      console.log("   ❌ Missing fields");
      return res.status(400).json({ status: "error", message: "All fields required" });
    }

    console.log("   Checking for existing user...");
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ username: username.trim() }, { email: email.trim() }] 
    });
    
    if (existingUser) {
      console.log("   ❌ User already exists:", existingUser.username);
      return res.status(400).json({ 
        status: "error", 
        message: existingUser.username === username.trim() 
          ? "Username already exists" 
          : "Email already exists" 
      });
    }

    console.log("   Hashing password with bcrypt...");
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password.trim(), 10);
      console.log("   ✅ Password hashed successfully");
    } catch (hashErr) {
      console.error("   ❌ Bcrypt error:", hashErr);
      throw new Error("Password hashing failed: " + hashErr.message);
    }
    
    console.log("   Creating user document...");
    const newUser = new User({
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    console.log("   Saving to database...");
    await newUser.save();
    console.log("   ✅ User created successfully:", username);

    res.json({ status: "success", message: "User created" });
  } catch (err) {
    console.error("❌ Signup error details:");
    console.error("   Message:", err.message);
    console.error("   Stack:", err.stack);
    console.error("   Code:", err.code);
    console.error("   Name:", err.name);
    
    // Handle duplicate key errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ 
        status: "error", 
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` 
      });
    }
    
    res.status(500).json({ 
      status: "error", 
      message: "Signup failed", 
      error: err.message 
    });
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
