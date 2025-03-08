import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../models/admin.model.js';

// Middleware to protect admin routes
export const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the admin from the token's decoded ID
      req.user = await Admin.findById(decoded.id).select('-password');

      if (!req.user) {
        throw new Error('Admin not found');
      }

      next(); // Proceed to the next middleware or controller
    } catch (error) {
      console.error('Error with token verification:', error.message);
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }
});
