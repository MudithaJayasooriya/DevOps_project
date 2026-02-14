import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://3.110.81.190:5173",
  credentials: true,
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// MongoDB connection with better error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected to:", process.env.MONGODB_URI.split('@')[1] || process.env.MONGODB_URI);
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("   Check if MongoDB is running and MONGODB_URI is correct");
  });

// Middleware to check DB connection
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    console.warn("⚠️ MongoDB not connected. Connection state:", mongoose.connection.readyState);
    return res.status(503).json({ 
      status: "error", 
      message: "Database not connected. Please try again later." 
    });
  }
  next();
});

// Health check endpoint - MUST come before other routes
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

// Route handlers
app.use("/users", userRoutes);
app.use("/", propertyRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({ 
    status: "error", 
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`✅ Server running on http://3.110.81.190:${PORT}`);
  
  // Test bcrypt on startup
  try {
    const bcrypt = await import('bcrypt');
    const testHash = await bcrypt.hash('test', 10);
    console.log('✅ Bcrypt module loaded successfully');
  } catch (err) {
    console.error('❌ Bcrypt failed to load:', err.message);
    console.error('   Run: npm install bcrypt --save');
  }
});
