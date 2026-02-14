import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  district: { type: String },
  propertyType: { 
    type: String, 
    enum: ["Standard House", "Luxury House", "Villa", "Town House", "Apartment", "Other"], 
    default: "Other"
  }, 
  status: { type: String, enum: ["For Sale", "For Rent"], default: "For Sale" },
  description: { type: String },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  sqft: { type: Number },
  images: { type: [String] },
  
});

const Property = mongoose.model("Property", propertySchema);
export default Property;
