const express = require('express');
const {
    register,
    login,
    verifyEmail
} = require('../controllers/auth.controller');
const { validateRegistration, validateLogin } = require('../validators/auth.validator');
const authMiddleware = require('../middleware/auth.middleware');
const authService = require('../services/auth.service');

const router = express.Router();

// 📝 Register (sends Brevo email)
router.post('/register', validateRegistration, register);

// 🔐 Login (blocked if not verified)
router.post('/login', validateLogin, login);

// 📧 Email verification
router.get('/verify-email', verifyEmail);

// 🧑‍💼 Protected route to get profile
router.get('/profile', authMiddleware, async (req, res) => {
	try {
		const user = await authService.validateUser(req.userId);
		if (!user) return res.status(404).json({ message: 'User not found' });
		if (user.password_hash) delete user.password_hash;
		res.status(200).json({ user });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;


