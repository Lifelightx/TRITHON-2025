import express from 'express';
import {
  registerSeller,
  loginSeller,
  getSellerProfile,
  updateSellerProfile,
  addSellerAddress,
  updateSellerAddress,
  deleteSellerAddress,
} from '../controllers/seller.auth.controller.js';
import { protectSeller } from '../middleware/seller.auth.js';

const router = express.Router();

router.post('/register', registerSeller);
router.post('/login', loginSeller);
router.route('/profile')
  .get(protectSeller, getSellerProfile)
  .put(protectSeller, updateSellerProfile);
router.route('/address')
  .post(protectSeller, addSellerAddress);
router.route('/address/:id')
  .put(protectSeller, updateSellerAddress)
  .delete(protectSeller, deleteSellerAddress);

export default router;
