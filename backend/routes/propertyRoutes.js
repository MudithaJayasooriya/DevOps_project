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


 
router.get("/admin/properties", requireAdmin, getAllProperties);
router.post("/admin/properties", requireAdmin, adminCreateProperty);
router.put("/admin/properties/:id", requireAdmin, adminUpdateProperty);
router.delete("/admin/properties/:id", requireAdmin, adminDeleteProperty);


router.get("/", getAllProperties);
router.get("/:id", getProperty);
router.post("/user", userCreateProperty);
router.put("/user/:id", userUpdateProperty);
router.delete("/user/:id", userDeleteProperty);

export default router;