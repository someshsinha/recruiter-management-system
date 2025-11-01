// src/controllers/application.controller.js
const applicationService = require('../services/application.service');

// ✅ Apply to a job
exports.applyToJob = async (req, res) => {
    try {
        const userId = req.userId;
        const { job_id } = req.body;

        if (!job_id) {
            return res.status(400).json({ message: 'Job ID is required' });
        }

        const resumePath = req.file ? req.file.path : null;

        const result = await applicationService.applyToJob(userId, job_id, resumePath);
        res.status(201).json({
            message: 'Application submitted successfully',
            data: result
        });
    } catch (error) {
        console.error('❌ Error in applyToJob:', error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get all applications for the logged-in user
exports.getApplications = async (req, res) => {
    try {
        const userId = req.userId;
        const applications = await applicationService.getApplications(userId);
        res.status(200).json(applications);
    } catch (error) {
        console.error('❌ Error in getApplications:', error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Update application status (for recruiters)
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        await applicationService.updateStatus(id, status);
        res.status(200).json({ message: 'Application status updated successfully' });
    } catch (error) {
        console.error('❌ Error in updateStatus:', error);
        res.status(500).json({ message: error.message });
    }
};

