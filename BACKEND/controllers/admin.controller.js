import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"
import Product from "../models/product.model.js"
import Order from "../models/order.model.js"
import Category from "../models/category.model.js"

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const count = await User.countDocuments({})
  const users = await User.find({})
    .select("-password")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 })

  res.json({
    users,
    page,
    pages: Math.ceil(count / pageSize),
    count,
  })
})

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password")

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.role = req.body.role || user.role
    user.isApproved = req.body.isApproved !== undefined ? req.body.isApproved : user.isApproved
    user.isActive = req.body.isActive !== undefined ? req.body.isActive : user.isActive

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      isApproved: updatedUser.isApproved,
      isActive: updatedUser.isActive,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    // Instead of deleting, mark as inactive
    user.isActive = false
    await user.save()

    res.json({ message: "User deactivated" })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Get pending seller approvals
// @route   GET /api/admin/sellers/pending
// @access  Private/Admin
export const getPendingSellerApprovals = asyncHandler(async (req, res) => {
  const sellers = await User.find({
    role: "seller",
    isApproved: false,
    isActive: true,
  }).select("-password")

  res.json(sellers)
})

// @desc    Approve or reject seller
// @route   PUT /api/admin/sellers/:id/approve
// @access  Private/Admin
export const approveSeller = asyncHandler(async (req, res) => {
  const { approved } = req.body

  const seller = await User.findById(req.params.id)

  if (!seller) {
    res.status(404)
    throw new Error("Seller not found")
  }

  if (seller.role !== "seller") {
    res.status(400)
    throw new Error("User is not a seller")
  }

  seller.isApproved = approved
  await seller.save()

  res.json({
    message: approved ? "Seller approved" : "Seller rejected",
    seller: {
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      isApproved: seller.isApproved,
    },
  })
})

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = asyncHandler(async (req, res) => {
  // Get total users count
  const totalUsers = await User.countDocuments({ role: "user" })

  // Get total sellers count
  const totalSellers = await User.countDocuments({ role: "seller" })

  // Get total products count
  const totalProducts = await Product.countDocuments()

  // Get total orders count
  const totalOrders = await Order.countDocuments()

  // Get total revenue
  const orders = await Order.find({ isPaid: true })
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0)

  // Get recent orders
  const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate("user", "name")

  // Get top selling products
  const topProducts = await Product.find().sort({ rating: -1 }).limit(5)

  res.json({
    totalUsers,
    totalSellers,
    totalProducts,
    totalOrders,
    totalRevenue,
    recentOrders,
    topProducts,
  })
})

// @desc    Create a category
// @route   POST /api/admin/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, image, parentCategory } = req.body

  const categoryExists = await Category.findOne({ name })

  if (categoryExists) {
    res.status(400)
    throw new Error("Category already exists")
  }

  const category = await Category.create({
    name,
    description,
    image,
    parentCategory: parentCategory || null,
  })

  res.status(201).json(category)
})

// @desc    Update a category
// @route   PUT /api/admin/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const { name, description, image, isActive, parentCategory } = req.body

  const category = await Category.findById(req.params.id)

  if (category) {
    category.name = name || category.name
    category.description = description || category.description
    category.image = image || category.image
    category.isActive = isActive !== undefined ? isActive : category.isActive
    category.parentCategory = parentCategory || category.parentCategory

    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

// @desc    Delete a category
// @route   DELETE /api/admin/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    // Check if category has products
    const hasProducts = await Product.findOne({ category: req.params.id })

    if (hasProducts) {
      // Instead of deleting, mark as inactive
      category.isActive = false
      await category.save()
      res.json({ message: "Category marked as inactive" })
    } else {
      await category.remove()
      res.json({ message: "Category removed" })
    }
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

// @desc    Feature or unfeature a product
// @route   PUT /api/admin/products/:id/feature
// @access  Private/Admin
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
