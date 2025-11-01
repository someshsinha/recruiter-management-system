const express = require('express');
const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    updateJobStatus,
    deleteJob,
    searchJobs,
} = require('../controllers/job.controller');
const {
    validateCreateJob,
    validateUpdateJob,
    validateUpdateJobStatus,
} = require('../validators/job.validator');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// All job routes require authentication
router.use(authMiddleware);

// Search jobs (for applicants - matches their domain)
router.get('/search', searchJobs);

// Create a new job (recruiters only)
router.post('/', validateCreateJob, createJob);

// Get all jobs (recruiters see their own, applicants see matching jobs)
router.get('/', getJobs);

// Get a specific job
router.get('/:jobId', getJobById);

// Update a job (recruiters only)
router.put('/:jobId', validateUpdateJob, updateJob);

// Update job status (recruiters only)
router.patch('/:jobId/status', validateUpdateJobStatus, updateJobStatus);

// Delete a job (recruiters only)
router.delete('/:jobId', deleteJob);

module.exports = router;