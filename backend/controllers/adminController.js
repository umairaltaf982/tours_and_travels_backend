const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const transporter = require('../utils/email');

// POST /api/admin/signup
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await Admin.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Admin already exists' });

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await Admin.create({ name, email, password: hashedPassword });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin),
    });
  } else {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// PUT /api/admin/enable-mfa
exports.enableMfa = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.user.id, { isMfaEnabled: true }, { new: true });
    res.json({ message: 'MFA enabled' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/admin/login (MFA extension)
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPassword(password))) {
    if (admin.isMfaEnabled) {
      const otp = crypto.randomInt(100000, 999999).toString();
      admin.otp = otp;
      admin.otpExpiry = Date.now() + 10 * 60 * 1000;
      admin.isOtpVerified = false;
      await admin.save();
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: admin.email,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otp}`,
      });
      return res.json({ message: 'OTP sent', mfa: true });
    }
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// POST /api/admin/verify-otp
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !admin.otp || !admin.otpExpiry) {
    return res.status(400).json({ error: 'OTP not found' });
  }
  if (admin.otp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
  if (admin.otpExpiry < Date.now()) {
    return res.status(400).json({ error: 'OTP Expired' });
  }
  admin.isOtpVerified = true;
  admin.otp = undefined;
  admin.otpExpiry = undefined;
  await admin.save();
  res.json({ token: generateToken(admin), message: 'Login successful' });
};
