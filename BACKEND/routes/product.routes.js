import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  getFeaturedProducts,
  getSellerProducts,
} from '../controllers/product.controller.js';
// import { protect, seller, approvedSeller } from '../middleware/auth.js';
import upload from '../middleware/upload.js'; // Import the multer upload middleware
import { protectSeller, approvedSeller } from '../middleware/seller.auth.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(
    protectSeller,
    approvedSeller,
    upload.fields([
      { name: 'images', maxCount: 5 }, // Support up to 5 image uploads
      { name: 'videos', maxCount: 2 }  // Support up to 2 video uploads
    ]),
    createProduct
  ); // Add upload middleware for images and videos

router.get('/top', getTopProducts);
router.get('/featured', getFeaturedProducts);
router.get('/seller', protectSeller, getSellerProducts);

router.route('/:id')
  .get(getProductById)
  .put(
    protectSeller,
    approvedSeller,
    upload.fields([
      { name: 'images', maxCount: 5 }, // Support up to 5 image uploads
      { name: 'videos', maxCount: 2 }  // Support up to 2 video uploads
    ]),
    updateProduct
  ) // Add upload middleware for images and videos
  .delete(protectSeller, approvedSeller, deleteProduct);

export default router;
