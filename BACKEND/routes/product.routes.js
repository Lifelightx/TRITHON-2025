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
import {protectSeller,  approvedSeller} from '../middleware/seller.auth.js'
const router = express.Router();

router.route('/')
  .get(getProducts)
  .post( protectSeller, approvedSeller, upload.array('images', 5), createProduct); // Add upload middleware

router.get('/top', getTopProducts);
router.get('/featured', getFeaturedProducts);
router.get('/seller', protectSeller,  getSellerProducts);

router.route('/:id')
  .get(getProductById)
  .put(protectSeller,  approvedSeller, upload.array('images', 5), updateProduct) // Add upload middleware
  .delete(protectSeller,  approvedSeller, deleteProduct);

export default router;
