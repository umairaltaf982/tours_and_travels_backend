const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, enableMfa, verifyOtp } = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');

router.post('/signup', registerAdmin);
router.post('/login', loginAdmin);
router.put('/enable-mfa', auth, enableMfa);
router.post('/verify-otp', verifyOtp);

module.exports = router;
