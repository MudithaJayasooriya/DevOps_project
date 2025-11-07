import mongoose from "mongoose";
import { $where } from "../models/User";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => 
    console.log("Database Connected to MongoDB Atlas"));
    await mongoose.connect(`${process.env.MONGODB_URI}/realestate`)
  } catch (error) {
    console.error(error.massage);
    
  }
}
export default connectDB;