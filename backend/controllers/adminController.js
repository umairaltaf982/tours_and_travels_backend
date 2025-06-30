const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

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

// POST /api/admin/login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
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
