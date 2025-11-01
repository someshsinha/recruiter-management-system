const jobService = require('../services/job.service');

exports.createJob = async (req, res) => {
    try {
        const job = await jobService.createJob(req.userId, req.body);
        res.status(201).json({ 
            message: 'Job created successfully', 
            job 
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await jobService.getJobsByRecruiter(req.userId);
        res.status(200).json({ jobs });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await jobService.getJobById(
            req.params.jobId, 
            req.userId,
            req.userRole
        );
        res.status(200).json({ job });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const job = await jobService.updateJob(
            req.params.jobId, 
            req.userId, 
            req.body
        );
        res.status(200).json({ 
            message: 'Job updated successfully', 
            job 
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

exports.updateJobStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const job = await jobService.updateJobStatus(
            req.params.jobId, 
            req.userId, 
            status
        );
        res.status(200).json({ 
            message: 'Job status updated successfully', 
            job 
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        await jobService.deleteJob(req.params.jobId, req.userId);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

exports.searchJobs = async (req, res) => {
    try {
        const jobs = await jobService.searchJobsForApplicant(req.userId);
        res.status(200).json({ jobs });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};