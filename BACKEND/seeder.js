import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import Product from './models/product.model.js';
import Category from './models/category.model.js';
import Order from './models/order.model.js';
import Review from './models/review.model.js';
import Cart from './models/cart.model.js';
import Wishlist from './models/wishlist.model.js';
import connectDB from './config/database.js';
import Seller from './models/seller.model.js';
dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear all data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    await Review.deleteMany();
    await Cart.deleteMany();
    await Wishlist.deleteMany();

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      phone: '1234567890',
      role: 'admin',
      isApproved: true,
    });

    // Create seller user
    const sellerUser = await Seller.create({
      name: 'Seller User',
      email: 'seller@example.com',
      password: 'password123',
      phone: '9876543210',
      role: 'seller',
      isApproved: true,
      businessName:"Siadimal",
      businessAddress:{
        street: "Siadimal",
        city: "Raj-Nilgiri",
        state: "Balasore",
        country: "Odisha",
        postalCode: "752001"
      }
    });

    // Create regular user
    await User.create({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'password123',
      phone: '5555555555',
      role: 'user',
    });

    // Create categories
    const categories = [
      {
        name: 'Handloom',
        description: 'Traditional handloom products from Odisha',
        image: '/images/categories/handloom.jpg',
      },
      {
        name: 'Pottery',
        description: 'Handcrafted pottery items',
        image: '/images/categories/pottery.jpg',
      },
      {
        name: 'Wood Carving',
        description: 'Intricate wood carvings by skilled artisans',
        image: '/images/categories/woodcarving.jpg',
      },
    ];

    const createdCategories = await Category.insertMany(categories);

    // Create sample products
    const products = [
      {
        name: 'Sambalpuri Saree',
        description: 'Traditional Sambalpuri saree with intricate designs',
        price: 2500,
        images: ['/images/products/sambalpuri1.jpg', '/images/products/sambalpuri2.jpg'],
        category: createdCategories[0]._id,
        seller: sellerUser._id,
        countInStock: 15,
        rating: 4.5,
        numReviews: 12,
        materials: ['Cotton', 'Silk'],
        craftType: 'Handloom',
        region: 'Sambalpur, Odisha',
        tags: ['saree', 'traditional', 'handloom'],
      },
      {
        name: 'Terracotta Horse',
        description: 'Handcrafted terracotta horse figurine',
        price: 850,
        images: ['/images/products/terracotta1.jpg'],
        category: createdCategories[1]._id,
        seller: sellerUser._id,
        countInStock: 8,
        rating: 4.0,
        numReviews: 8,
        materials: ['Clay'],
        dimensions: {
          length: 25,
          width: 10,
          height: 30,
          unit: 'cm',
        },
        weight: {
          value: 500,
          unit: 'g',
        },
        craftType: 'Pottery',
        region: 'Puri, Odisha',
        tags: ['terracotta', 'figurine', 'decoration'],
      },
      {
        name: 'Konark Wheel Replica',
        description: 'Wooden replica of the famous Konark Sun Temple wheel',
        price: 1200,
        images: ['/images/products/konark1.jpg'],
        category: createdCategories[2]._id,
        seller: sellerUser._id,
        countInStock: 5,
        rating: 5.0,
        numReviews: 10,
        materials: ['Teak Wood'],
        dimensions: {
          length: 30,
          width: 5,
          height: 30,
          unit: 'cm',
        },
        weight: {
          value: 1.2,
          unit: 'kg',
        },
        craftType: 'Wood Carving',
        region: 'Konark, Odisha',
        tags: ['wood', 'carving', 'replica', 'konark'],
      },
    ];

    await Product.insertMany(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    await Review.deleteMany();
    await Cart.deleteMany();
    await Wishlist.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
