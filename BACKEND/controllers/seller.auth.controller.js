import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Seller from '../models/seller.model.js';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // expiresIn: '30d',
  });
};

// @desc    Register a new seller
// @route   POST /api/sellers/register
// @access  Public
export const registerSeller = asyncHandler(async (req, res) => {
  const { name, email, password, phone, businessName, businessAddress } = req.body;

  // Check if seller exists
  const sellerExists = await Seller.findOne({ email });

  if (sellerExists) {
    res.status(400);
    throw new Error('Seller already exists');
  }

  // Create seller
  const seller = await Seller.create({
    name,
    email,
    password,
    phone,
    businessName,
    businessAddress,
    role: 'seller', // Set role to 'seller'
    isApproved: false, // Sellers need approval
  });

  if (seller) {
    res.status(201).json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      businessName: seller.businessName,
      businessAddress: seller.businessAddress,
      role: seller.role,
      isApproved: seller.isApproved,
      token: generateToken(seller._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid seller data');
  }
});

// @desc    Auth seller & get token
// @route   POST /api/sellers/login
// @access  Public
export const loginSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for seller email
  const seller = await Seller.findOne({ email }).select('+password');

  if (seller && (await seller.matchPassword(password))) {
    if (!seller.isActive) {
      res.status(401);
      throw new Error('Account has been deactivated. Please contact support.');
    }

    if (!seller.isApproved) {
      res.status(401);
      throw new Error('Seller account is pending approval');
    }
    

    res.json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      businessName: seller.businessName,
      businessAddress: seller.businessAddress,
      role: seller.role,
      isApproved: seller.isApproved,
      token: generateToken(seller._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get seller profile
// @route   GET /api/sellers/profile
// @access  Private
export const getSellerProfile = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.seller._id);

  if (seller) {
    res.json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      businessName: seller.businessName,
      businessAddress: seller.businessAddress,
      role: seller.role,
      profileImage: seller.profileImage,
    });
  } else {
    res.status(404);
    throw new Error('Seller not found');
  }
});

// @desc    Update seller profile
// @route   PUT /api/sellers/profile
// @access  Private
export const updateSellerProfile = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.seller._id);

  if (seller) {
    seller.name = req.body.name || seller.name;
    seller.email = req.body.email || seller.email;
    seller.phone = req.body.phone || seller.phone;
    seller.businessName = req.body.businessName || seller.businessName;
    seller.businessAddress = req.body.businessAddress || seller.businessAddress;
    seller.profileImage = req.body.profileImage || seller.profileImage;
    
    if (req.body.password) {
      seller.password = req.body.password;
    }

    const updatedSeller = await seller.save();

    res.json({
      _id: updatedSeller._id,
      name: updatedSeller.name,
      email: updatedSeller.email,
      phone: updatedSeller.phone,
      businessName: updatedSeller.businessName,
      businessAddress: updatedSeller.businessAddress,
      role: updatedSeller.role,
      profileImage: updatedSeller.profileImage,
      token: generateToken(updatedSeller._id),
    });
  } else {
    res.status(404);
    throw new Error('Seller not found');
  }
});

// @desc    Add seller address
// @route   POST /api/sellers/address
// @access  Private
export const addSellerAddress = asyncHandler(async (req, res) => {
  const { street, city, state, postalCode, country, isDefault } = req.body;
  
  const seller = await Seller.findById(req.seller._id);

  if (seller) {
    // If this address is set as default, unset any existing default
    if (isDefault) {
      seller.businessAddress.forEach(address => {
        address.isDefault = false;
      });
    }

    // Add new address
    seller.businessAddress.push({
      street,
      city,
      state,
      postalCode,
      country,
      isDefault: isDefault || false,
    });

    await seller.save();
    
    res.status(201).json(seller.businessAddress);
  } else {
    res.status(404);
    throw new Error('Seller not found');
  }
});

// @desc    Update seller address
// @route   PUT /api/sellers/address/:id
// @access  Private
export const updateSellerAddress = asyncHandler(async (req, res) => {
  const { street, city, state, postalCode, country, isDefault } = req.body;
  
  const seller = await Seller.findById(req.seller._id);

  if (seller) {
    const addressIndex = seller.businessAddress.findIndex(
      address => address._id.toString() === req.params.id
    );

    if (addressIndex === -1) {
      res.status(404);
      throw new Error('Address not found');
    }

    // If this address is set as default, unset any existing default
    if (isDefault) {
      seller.businessAddress.forEach(address => {
        address.isDefault = false;
      });
    }

    // Update address
    seller.businessAddress[addressIndex] = {
      _id: seller.businessAddress[addressIndex]._id,
      street: street || seller.businessAddress[addressIndex].street,
      city: city || seller.businessAddress[addressIndex].city,
      state: state || seller.businessAddress[addressIndex].state,
      postalCode: postalCode || seller.businessAddress[addressIndex].postalCode,
      country: country || seller.businessAddress[addressIndex].country,
      isDefault: isDefault !== undefined ? isDefault : seller.businessAddress[addressIndex].isDefault,
    };

    await seller.save();
    
    res.json(seller.businessAddress);
  } else {
    res.status(404);
    throw new Error('Seller not found');
  }
});

// @desc    Delete seller address
// @route   DELETE /api/sellers/address/:id
// @access  Private
export const deleteSellerAddress = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.seller._id);

  if (seller) {
    const addressIndex = seller.businessAddress.findIndex(
      address => address._id.toString() === req.params.id
    );

    if (addressIndex === -1) {
      res.status(404);
      throw new Error('Address not found');
    }

    // Remove address
    seller.businessAddress.splice(addressIndex, 1);

    await seller.save();
    
    res.json({ message: 'Address removed' });
  } else {
    res.status(404);
    throw new Error('Seller not found');
  }
});
