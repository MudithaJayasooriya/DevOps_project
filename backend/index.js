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


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err));


app.use("/users", userRoutes);
app.use("/", propertyRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on http://3.110.81.190:${PORT}`));
