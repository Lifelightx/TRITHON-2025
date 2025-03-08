import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";
import Seller from "../models/seller.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import Category from "../models/category.model.js";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token valid for 30 days
  });
};

// @desc    Admin Login & Token Generation
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password");
  if (admin && (await admin.matchPassword(password))) {
    res.status(200).json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get Admin Profile
// @route   GET /api/admin/profile
// @access  Private/Admin
export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user._id);

  if (admin) {
    res.status(200).json({
      _id: admin._id,
      email: admin.email,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, image, parentCategory } = req.body;
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }
  const category = await Category.create({
    name,
    description,
    image,
    parentCategory: parentCategory || null,
  });
  res.status(201).json(category);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    const hasProducts = await Product.findOne({ category: req.params.id });
    if (hasProducts) {
      category.isActive = false;
      await category.save();
      res.json({ message: "Category marked as inactive" });
    } else {
      await category.remove();
      res.json({ message: "Category removed" });
    }
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});
// @desc    Get all users (both users and sellers)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await User.countDocuments({});
  const users = await User.find({})
    .select("-password")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    users,
    page,
    pages: Math.ceil(count / pageSize),
    count,
  });
});

// @desc    Get user or seller by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id).select("-password");
  if (!user) {
    user = await Seller.findById(req.params.id).select("-password");
  }

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User or Seller not found");
  }
});

// @desc    Update user or seller
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    user = await Seller.findById(req.params.id); // If not a regular user, check for seller
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.role = req.body.role || user.role; // Only applicable for users
    user.isApproved =
      req.body.isApproved !== undefined ? req.body.isApproved : user.isApproved; // For sellers
    user.isActive =
      req.body.isActive !== undefined ? req.body.isActive : user.isActive;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role || "seller",
      isApproved: updatedUser.isApproved,
      isActive: updatedUser.isActive,
    });
  } else {
    res.status(404);
    throw new Error("User or Seller not found");
  }
});

// @desc    Deactivate user or seller
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    user = await Seller.findById(req.params.id);
  }

  if (user) {
    user.isActive = false; // Mark as inactive instead of hard delete
    await user.save();
    res.json({ message: "User or Seller deactivated" });
  } else {
    res.status(404);
    throw new Error("User or Seller not found");
  }
});

// @desc    Get pending seller approvals
// @route   GET /api/admin/sellers/pending
// @access  Private/Admin
export const getPendingSellerApprovals = asyncHandler(async (req, res) => {
  const sellers = await Seller.find({
    isApproved: false,
    isActive: true,
  }).select("-password");

  res.json(sellers);
});

// @desc    Approve or reject seller
// @route   PUT /api/admin/sellers/:id/approve
// @access  Private/Admin
export const approveSeller = asyncHandler(async (req, res) => {
  const { approved } = req.body;

  const seller = await Seller.findById(req.params.id);

  if (!seller) {
    res.status(404);
    throw new Error("Seller not found");
  }

  seller.isApproved = approved;
  await seller.save();

  res.json({
    message: approved ? "Seller approved" : "Seller rejected",
    seller: {
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      aadhaarNumber: seller.aadhaarNumber,
      isApproved: seller.isApproved,
    },
  });
});

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalSellers = await Seller.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();

  const orders = await Order.find({ isPaid: true });
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("user", "name");

  const topProducts = await Product.find().sort({ rating: -1 }).limit(5);

  res.json({
    totalUsers,
    totalSellers,
    totalProducts,
    totalOrders,
    totalRevenue,
    recentOrders,
    topProducts,
  });
});

export const featureProduct = asyncHandler(async (req, res) => {
  const { featured } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.isFeatured = featured;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { name, description, image, isActive, parentCategory } = req.body;
  const category = await Category.findById(req.params.id);
  if (category) {
    category.name = name || category.name;
    category.description = description || category.description;
    category.image = image || category.image;
    category.isActive = isActive !== undefined ? isActive : category.isActive;
    category.parentCategory = parentCategory || category.parentCategory;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});
// Add other existing functionalities like createCategory, updateCategory, deleteCategory, etc.

// @desc    Approve or reject a product submitted by a seller
// @route   POST /api/admin/products/:id/approve
// @access  Private/Admin
export const approveProduct = asyncHandler(async (req, res) => {
  const { approved } = req.body; // Expecting "approved" (boolean) in the request body

  // Find the product by ID
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check if the product belongs to a seller
  const seller = await Seller.findById(product.seller);

  if (!seller) {
    res.status(400);
    throw new Error("Product does not belong to a valid seller");
  }

  // Update product approval status
  product.isApproved = approved;
  await product.save();

  res.status(200).json({
    message: approved
      ? "Product approved successfully"
      : "Product approval rejected",
    product: {
      _id: product._id,
      name: product.name,
      seller: seller.name,
      isApproved: product.isApproved,
    },
  });
});
