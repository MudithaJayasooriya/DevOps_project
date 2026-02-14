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

// MongoDB connection with better error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected to:", process.env.MONGODB_URI.replace(/\/\/.*@/, "//***@")))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("   Check if MongoDB is running and MONGODB_URI is correct");
  });

// Middleware to check DB connection
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    console.warn("⚠️ MongoDB not connected. Connection state:", mongoose.connection.readyState);
  }
  next();
});


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
app.listen(PORT, () => console.log(`✅ Server running on http://3.110.81.190:${PORT}`));
