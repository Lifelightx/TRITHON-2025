import express from "express";
import {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.js";
import { protectAdmin } from "../middleware/admin.auth.js";

const router = express.Router();

// Create a new order
router.post("/", protect, createOrder);

// Get order details by ID
router.get("/:id", protect, getOrderById);

// Get logged-in user's orders
router.get("/myorders", protect, getMyOrders);

// Update order to "Paid"
router.put("/:id/pay", protect, updateOrderToPaid);

// Update order status (Admin-only)
router.put("/:id/status", protect, protectAdmin, updateOrderStatus);

// Get all orders (Admin-only)
//router.get("/", protect, getAllOrders);

export default router;
