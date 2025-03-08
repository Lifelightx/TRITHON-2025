import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/address')
  .post(protect, addUserAddress);
router.route('/address/:id')
  .put(protect, updateUserAddress)
  .delete(protect, deleteUserAddress);

export default router;
