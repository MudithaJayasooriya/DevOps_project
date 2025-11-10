import mongoose from "mongoose";
import { $where } from "../models/User";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => 
    console.log("Database Connected to MongoDB Atlas"));
await mongoose.connect(process.env.MONGODB_URI)
  } catch (error) {
   console.error(error.message);

    
  }
}
export default connectDB;
