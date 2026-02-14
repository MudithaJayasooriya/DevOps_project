// propertyRoutes.js
import express from "express";
import {
  getAllProperties,
  getProperty,
  adminCreateProperty,
  adminUpdateProperty,
  adminDeleteProperty,
  userCreateProperty,
  userUpdateProperty,
  userDeleteProperty,
} from "../controllers/propertyController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin routes - more specific paths first
router.get("/admin/properties", requireAdmin, getAllProperties);
router.post("/admin/properties", requireAdmin, adminCreateProperty);
router.put("/admin/properties/:id", requireAdmin, adminUpdateProperty);
router.delete("/admin/properties/:id", requireAdmin, adminDeleteProperty);

// Public routes
router.get("/", getAllProperties);
router.post("/user", userCreateProperty);
router.put("/user/:id", userUpdateProperty);
router.delete("/user/:id", userDeleteProperty);

// ID-based route MUST come last to avoid catching other paths
router.get("/:id", getProperty);

export default router;