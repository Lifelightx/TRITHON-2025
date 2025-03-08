import asyncHandler from "express-async-handler"
import Order from "../models/order.model.js"
import Product from "../models/product.model.js"
import Cart from "../models/cart.model.js"

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, customerNotes } =
    req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("No order items")
  }

  // Verify all products exist and have enough stock
  for (const item of orderItems) {
    const product = await Product.findById(item.product)

    if (!product) {
      res.status(404)
      throw new Error(`Product not found: ${item.product}`)
    }

    if (product.countInStock < item.qty) {
      res.status(400)
      throw new Error(`Not enough stock for ${product.name}`)
    }
  }

  // Create order
  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    customerNotes: customerNotes || "",
  })

  // Update product stock
  for (const item of orderItems) {
    const product = await Product.findById(item.product)
    product.countInStock -= item.qty
    await product.save()
  }

  // Clear user's cart after successful order
  await Cart.findOneAndUpdate({ user: req.user._id }, { $set: { items: [] } })

  const createdOrder = await order.save()
  res.status(201).json(createdOrder)
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate({
      path: "orderItems.product",
      select: "name images",
    })
    .populate({
      path: "orderItems.seller",
      select: "name email",
    })

  if (order) {
    // Check if the order belongs to the user or the user is an admin
    if (
      order.user._id.toString() === req.user._id.toString() ||
      req.user.role === "admin" ||
      order.orderItems.some((item) => item.seller._id.toString() === req.user._id.toString())
    ) {
      res.json(order)
    } else {
      res.status(403)
      throw new Error("Not authorized to view this order")
    }
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Seller/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, trackingNumber, sellerNotes } = req.body
  const order = await Order.findById(req.params.id)

  if (order) {
    // Check if user is seller of any item in the order or admin
    const isSeller = order.orderItems.some((item) => item.seller.toString() === req.user._id.toString())

    if (!isSeller && req.user.role !== "admin") {
      res.status(403)
      throw new Error("Not authorized to update this order")
    }

    order.status = status || order.status

    if (trackingNumber) {
      order.trackingNumber = trackingNumber
    }

    if (sellerNotes) {
      order.sellerNotes = sellerNotes
    }

    if (status === "Delivered") {
      order.deliveredAt = Date.now()
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).populate({
    path: "orderItems.product",
    select: "name images",
  })

  res.json(orders)
})

// @desc    Get seller orders
// @route   GET /api/orders/sellerorders
// @access  Private/Seller
export const getSellerOrders = asyncHandler(async (req, res) => {
  // Find orders where the seller has at least one item
  const orders = await Order.find({
    "orderItems.seller": req.user._id,
  })
    .sort({ createdAt: -1 })
    .populate("user", "name email")
    .populate({
      path: "orderItems.product",
      select: "name images price",
    })

  // Filter order items to only include those belonging to this seller
  const filteredOrders = orders.map((order) => {
    const sellerItems = order.orderItems.filter((item) => item.seller.toString() === req.user._id.toString())

    return {
      ...order.toObject(),
      orderItems: sellerItems,
    }
  })

  res.json(filteredOrders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const count = await Order.countDocuments({})
  const orders = await Order.find({})
    .populate("user", "id name")
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    orders,
    page,
    pages: Math.ceil(count / pageSize),
    count,
  })
})

