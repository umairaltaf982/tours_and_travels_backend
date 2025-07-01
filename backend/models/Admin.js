const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please provide a valid email'],
  },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  otp: String,
  otpExpiry: Date,
  isMfaEnabled: {
    type: Boolean,
    default: false
  },
  isOtpVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
