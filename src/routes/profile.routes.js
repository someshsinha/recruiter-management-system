const express = require('express');
const { 
    getProfile, 
    updateProfile, 
    uploadResume,
    getPublicProfile 
} = require('../controllers/profile.controller');
const { validateUpdateProfile } = require('../validators/profile.validator');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../config/multer');

const router = express.Router();

// All profile routes require authentication
router.use(authMiddleware);

// Get current user's profile
router.get('/', getProfile);

// Update current user's profile
router.put('/', validateUpdateProfile, updateProfile);

// Upload resume (applicants only)
router.post('/resume', upload.single('resume'), uploadResume);

// Get another user's public profile (for recruiters viewing applicants)
router.get('/:userId', getPublicProfile);

module.exports = router;