import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

// Method to match user-entered password with stored password
adminSchema.methods.matchPassword = function (enteredPassword) {
  // Simple comparison of entered password with stored password
  return this.password === enteredPassword;
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
