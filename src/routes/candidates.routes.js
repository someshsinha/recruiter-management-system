const express = require('express');
const router = express.Router();
const candidatesController = require('../controllers/candidates.controller');

// Route to get all candidates
router.get('/', candidatesController.getAllCandidates);

// Route to get a candidate by ID
router.get('/:id', candidatesController.getCandidateById);

// Route to create a new candidate
router.post('/', candidatesController.createCandidate);

// Route to update a candidate by ID
router.put('/:id', candidatesController.updateCandidate);

// Route to delete a candidate by ID
router.delete('/:id', candidatesController.deleteCandidate);

module.exports = router;