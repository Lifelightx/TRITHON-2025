import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
   // expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, confirmPassword } = req.body;
  
  // Check if user exists
  const userExists = await User.findOne({ email });
  if (password !== confirmPassword){
    res.status(400);
    throw new Error('Passwords do not match');
  }
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
     // Sellers need approval
  });
 
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isApproved: user.isApproved,
      token: generateToken(user._id),
    });
    
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
  
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    if (!user.isActive) {
      res.status(401);
      throw new Error('Account has been deactivated. Please contact support.');
    }

    if (user.role === 'seller' && !user.isApproved) {
      res.status(401);
      throw new Error('Seller account is pending approval');
    }
    

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isApproved: user.isApproved,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      addresses: user.addresses,
      profileImage: user.profileImage,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.profileImage = req.body.profileImage || user.profileImage;
    
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Add user address
// @route   POST /api/auth/address
// @access  Private
export const addUserAddress = asyncHandler(async (req, res) => {
  const { street, city, state, postalCode, country, isDefault } = req.body;
  
  const user = await User.findById(req.user._id);

  if (user) {
    // If this address is set as default, unset any existing default
    if (isDefault) {
      user.addresses.forEach(address => {
        address.isDefault = false;
      });
    }

    // Add new address
    user.addresses.push({
      street,
      city,
      state,
      postalCode,
      country,
      isDefault: isDefault || false,
    });

    await user.save();
    
    res.status(201).json(user.addresses);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user address
// @route   PUT /api/auth/address/:id
// @access  Private
export const updateUserAddress = asyncHandler(async (req, res) => {
  const { street, city, state, postalCode, country, isDefault } = req.body;
  
  const user = await User.findById(req.user._id);

  if (user) {
    const addressIndex = user.addresses.findIndex(
      address => address._id.toString() === req.params.id
    );

    if (addressIndex === -1) {
      res.status(404);
      throw new Error('Address not found');
    }

    // If this address is set as default, unset any existing default
    if (isDefault) {
      user.addresses.forEach(address => {
        address.isDefault = false;
      });
    }

    // Update address
    user.addresses[addressIndex] = {
      _id: user.addresses[addressIndex]._id,
      street: street || user.addresses[addressIndex].street,
      city: city || user.addresses[addressIndex].city,
      state: state || user.addresses[addressIndex].state,
      postalCode: postalCode || user.addresses[addressIndex].postalCode,
      country: country || user.addresses[addressIndex].country,
      isDefault: isDefault !== undefined ? isDefault : user.addresses[addressIndex].isDefault,
    };

    await user.save();
    
    res.json(user.addresses);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user address
// @route   DELETE /api/auth/address/:id
// @access  Private
export const deleteUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const addressIndex = user.addresses.findIndex(
      address => address._id.toString() === req.params.id
    );

    if (addressIndex === -1) {
      res.status(404);
      throw new Error('Address not found');
    }

    // Remove address
    user.addresses.splice(addressIndex, 1);

    await user.save();
    
    res.json({ message: 'Address removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
