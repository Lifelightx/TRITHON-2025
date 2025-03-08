import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Seller from '../models/seller.model.js';

// Protect routes - verify token
export const protectSeller = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get seller from the token
      req.seller = await Seller.findById(decoded.id).select('-password');
      // console.log(req.seller)
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Seller middleware


// Verify seller is approved
export const approvedSeller = (req, res, next) => {
  
  if (req.seller && req.seller.role === 'seller' && req.seller.isApproved) {
    next();
  } else {
    res.status(403);
    throw new Error('Seller account not approved yet');
  }
};
