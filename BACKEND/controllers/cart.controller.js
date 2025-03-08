import asyncHandler from 'express-async-handler';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: 'items.product',
    select: 'name price images countInStock seller',
    populate: {
      path: 'seller',
      select: 'name',
    },
  });

  if (cart) {
    res.json(cart);
  } else {
    // If cart doesn't exist, create an empty one
    const newCart = await Cart.create({
      user: req.user._id,
      items: [],
    });
    res.json(newCart);
  }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  // Validate product exists and has stock
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (!product.isActive) {
    res.status(400);
    throw new Error('Product is no longer available');
  }

  if (product.countInStock < quantity) {
    res.status(400);
    throw new Error('Not enough stock available');
  }

  // Find user's cart or create one
  let cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    });
  }

  // Check if product already in cart
  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

  if (itemIndex > -1) {
    // Product exists in cart, update quantity
    cart.items[itemIndex].quantity = quantity;
  } else {
    // Product not in cart, add it
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  await cart.save();

  // Return updated cart with populated product details
  const updatedCart = await Cart.findById(cart._id).populate({
    path: 'items.product',
    select: 'name price images countInStock seller',
    populate: {
      path: 'seller',
      select: 'name',
    },
  });

  res.status(200).json(updatedCart);
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const productId = req.params.productId;

  // Validate product exists and has stock
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.countInStock < quantity) {
    res.status(400);
    throw new Error('Not enough stock available');
  }

  // Find user's cart
  const cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Find the item in the cart
  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  // Update quantity
  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  // Return updated cart with populated product details
  const updatedCart = await Cart.findById(cart._id).populate({
    path: 'items.product',
    select: 'name price images countInStock seller',
    populate: {
      path: 'seller',
      select: 'name',
    },
  });

  res.status(200).json(updatedCart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = asyncHandler(async (req, res) => {
  const productId = req.params.productId;

  // Find user's cart
  const cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Remove the item from the cart
  cart.items = cart.items.filter(item => item.product.toString() !== productId);
  await cart.save();

  // Return updated cart with populated product details
  const updatedCart = await Cart.findById(cart._id).populate({
    path: 'items.product',
    select: 'name price images countInStock seller',
    populate: {
      path: 'seller',
      select: 'name',
    },
  });

  res.status(200).json(updatedCart);
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
  // Find user's cart
  const cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Clear all items
  cart.items = [];
  await cart.save();

  res.status(200).json({ message: 'Cart cleared' });
});
