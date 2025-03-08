import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getPendingSellerApprovals,
  approveSeller,
  getDashboardStats,
  createCategory,
  updateCategory,
  deleteCategory,
  featureProduct,
  approveProduct, 
  loginAdmin, 
  getAdminProfile, // Import for product approval
} from "../controllers/admin.controller.js";
import { protectAdmin } from "../middleware/admin.auth.js"; // Middleware for route protection

const router = express.Router();

// Admin Authentication Routes
router.post("/login", loginAdmin); // Public route for admin login
router.get("/profile", protectAdmin, getAdminProfile); // Protected route for admin profile

// Users-related routes
router.route("/users").get(protectAdmin, getUsers);

router
  .route("/users/:id")
  .get(protectAdmin, getUserById)
  .put(protectAdmin, updateUser)
  .delete(protectAdmin, deleteUser);

// Sellers-related routes
router.get("/sellers/pending", protectAdmin, getPendingSellerApprovals);
router.post("/sellers/:id/approve", protectAdmin, approveSeller); // POST for approveSeller

// Dashboard-related routes
router.get("/dashboard", protectAdmin, getDashboardStats);

// Categories-related routes
router.route("/categories").post(protectAdmin, createCategory);

router
  .route("/categories/:id")
  .put(protectAdmin, updateCategory)
  .delete(protectAdmin, deleteCategory);

// Products-related routes
router.route("/products/:id/feature").put(protectAdmin, featureProduct);
router.route("/products/:id/approve").post(protectAdmin, approveProduct); // Product approval route

export default router;
