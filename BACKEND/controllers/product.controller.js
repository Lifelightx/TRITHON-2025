import asyncHandler from 'express-async-handler';
import Product from '../models/product.model.js';
// import Category from '../models/category.model.js';
import path from 'path';
import fs from 'fs';

// Helper function to process image files
const processImages = (files) => {
  return files.map(file => `/uploads/images/${file.filename}`);
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: 'i' } },
          { description: { $regex: req.query.keyword, $options: 'i' } },
          { tags: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};

  const category = req.query.category ? { category: req.query.category } : {};
  const priceMin = req.query.priceMin ? { price: { $gte: Number(req.query.priceMin) } } : {};
  const priceMax = req.query.priceMax ? { price: { $lte: Number(req.query.priceMax) } } : {};
  const rating = req.query.rating ? { rating: { $gte: Number(req.query.rating) } } : {};
  const craftType = req.query.craftType ? { craftType: req.query.craftType } : {};
  const region = req.query.region ? { region: req.query.region } : {};

  // Combine all filters
  const filters = {
    ...keyword,
    ...category,
    ...priceMin,
    ...priceMax,
    ...rating,
    ...craftType,
    ...region,
    isActive: true,
  };

  const count = await Product.countDocuments(filters);
  const products = await Product.find(filters)
    .populate('category', 'name')
    .populate('seller', 'name')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(req.query.sortBy ? { [req.query.sortBy]: req.query.order === 'desc' ? -1 : 1 } : { createdAt: -1 });

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    count,
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name').populate('seller', 'name');

  if (product && product.isActive) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Seller
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    countInStock,
    materials,
    dimensions,
    weight,
    tags,
    craftType,
    region,
  } = req.body;

  // Verify category exists
  // const categoryExists = await Category.findById(category);
  // if (!categoryExists) {
  //   res.status(400);
  //   throw new Error('Invalid category');
  // }

  const images = processImages(req.files);
  console.log()
  const product = new Product({
    seller: req.seller._id,
    name,
    description,
    price,
    images,
    category,
    countInStock,
    materials: materials || [],
    dimensions: dimensions || {},
    weight: weight || {},
    tags: tags || [],
    craftType,
    region,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Seller
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    countInStock,
    materials,
    dimensions,
    weight,
    tags,
    craftType,
    region,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // Check if the product belongs to the seller
    if (product.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('You can only update your own products');
    }

    // Verify category exists if changing
    if (category && category !== product.category.toString()) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        res.status(400);
        throw new Error('Invalid category');
      }
    }

    // Process new images if any
    const images = req.files.length ? processImages(req.files) : product.images;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.images = images;
    product.category = category || product.category;
    product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
    product.materials = materials || product.materials;
    product.dimensions = dimensions || product.dimensions;
    product.weight = weight || product.weight;
    product.tags = tags || product.tags;
    product.craftType = craftType || product.craftType;
    product.region = region || product.region;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Seller/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    // Check if the product belongs to the seller or user is admin
    if (product.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('You can only delete your own products');
    }

    // Instead of deleting, mark as inactive
    product.isActive = false;
    await product.save();

    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true })
    .sort({ rating: -1 })
    .limit(5)
    .populate('category', 'name')
    .populate('seller', 'name');

  res.json(products);
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true, isActive: true })
    .populate('category', 'name')
    .populate('seller', 'name')
    .limit(8);

  res.json(products);
});

// @desc    Get products by seller
// @route   GET /api/products/seller
// @access  Private/Seller
export const getSellerProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Product.countDocuments({ seller: req.user._id });
  const products = await Product.find({ seller: req.user._id })
    .populate('category', 'name')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    count,
  });
});
