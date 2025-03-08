import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const sellerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    businessName: {
      type: String,
      required: [true, 'Please add a business name'],
    },
    businessAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    isApproved: {
      type: Boolean,
      default: false, // Sellers require approval
    },
    profileImage: {
      type: String,
      default: '',
    },
    role:{
      type: String,
      default: 'seller',  // Role of seller is set to seller by default.
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
sellerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match seller entered password to hashed password in database
sellerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;
