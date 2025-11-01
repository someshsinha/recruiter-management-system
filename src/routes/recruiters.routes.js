const express = require('express');
const router = express.Router();
const recruitersController = require('../controllers/recruiters.controller');
const { validateRecruiter } = require('../validators/recruiter.validator');
const authMiddleware = require('../middleware/auth.middleware');

// Create a new recruiter
router.post('/', authMiddleware.verifyToken, validateRecruiter, recruitersController.createRecruiter);

// Get all recruiters
router.get('/', authMiddleware.verifyToken, recruitersController.getAllRecruiters);

// Get a recruiter by ID
router.get('/:id', authMiddleware.verifyToken, recruitersController.getRecruiterById);

// Update a recruiter by ID
router.put('/:id', authMiddleware.verifyToken, validateRecruiter, recruitersController.updateRecruiter);

// Delete a recruiter by ID
router.delete('/:id', authMiddleware.verifyToken, recruitersController.deleteRecruiter);

module.exports = router;