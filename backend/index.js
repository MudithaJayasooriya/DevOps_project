import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

dotenv.config();
const app = express();

// Parse JSON bodies
app.use(express.json());

// ✅ CORS configuration (IMPORTANT)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://3.110.81.190:5173"],
    credentials: true,
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// Routes
app.use("/users", userRoutes);
app.use("/", propertyRoutes);

// Server start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://3.110.81.190:${PORT}`)
);
