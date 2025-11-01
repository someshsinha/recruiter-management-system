const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const authMiddleware = require('../middleware/auth.middleware'); // ✅ no destructuring
const applicationController = require('../controllers/application.controller'); // ✅ consistent name

// 📩 Apply to a job (with resume upload)
router.post('/', authMiddleware, upload.single('resume'), applicationController.applyToJob);

// 📋 Get all applications for logged-in user
router.get('/', authMiddleware, applicationController.getApplications);

// 🔄 Update application status (e.g., accepted/rejected)
router.put('/:id/status', authMiddleware, applicationController.updateStatus);

module.exports = router;

