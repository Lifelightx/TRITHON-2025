import express from "express"
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
} from "../controllers/admin.controller.js"
import { protect, admin } from "../middleware/auth.js"

const router = express.Router()

router.route("/users").get(protect, admin, getUsers)

router
  .route("/users/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser)

router.get("/sellers/pending", protect, admin, getPendingSellerApprovals)
router.put("/sellers/:id/approve", protect, admin, approveSeller)

router.get("/dashboard", protect, admin, getDashboardStats)

router.route("/categories").post(protect, admin, createCategory)

router.route("/categories/:id").put(protect, admin, updateCategory).delete(protect, admin, deleteCategory)

router.route("/products/:id/feature").put(protect, admin, featureProduct)

export default router

