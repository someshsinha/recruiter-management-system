const Job = require('../models/job.model');
const Client = require('../models/client.model');
const User = require('../models/user.model');

const createJob = async (recruiterId, jobData) => {
    // Verify recruiter exists
    const user = await User.findById(recruiterId);
    if (!user || user.role !== 'recruiter') {
        const err = new Error('Only recruiters can create jobs');
        err.status = 403;
        throw err;
    }

    // Verify client exists and belongs to recruiter
    const clientBelongs = await Client.belongsToRecruiter(jobData.client_id, recruiterId);
    if (!clientBelongs) {
        const err = new Error('Client not found or access denied');
        err.status = 403;
        throw err;
    }

    // Add recruiter_id to job data
    const dataWithRecruiter = {
        ...jobData,
        recruiter_id: recruiterId
    };

    return await Job.create(dataWithRecruiter);
};

const getJobsByRecruiter = async (recruiterId) => {
    return await Job.findByRecruiter(recruiterId);
};

const getJobById = async (jobId, userId, userRole) => {
    const job = await Job.findById(jobId);
    
    if (!job) {
        const err = new Error('Job not found');
        err.status = 404;
        throw err;
    }

    // Recruiters can only see their own jobs
    if (userRole === 'recruiter' && job.recruiter_id !== userId) {
        const err = new Error('Access denied');
        err.status = 403;
        throw err;
    }

    return job;
};

const updateJob = async (jobId, recruiterId, updates) => {
    // Verify ownership
    const belongs = await Job.belongsToRecruiter(jobId, recruiterId);
    if (!belongs) {
        const err = new Error('Access denied');
        err.status = 403;
        throw err;
    }

    const updated = await Job.update(jobId, updates);
    if (!updated) {
        const err = new Error('No fields to update');
        err.status = 400;
        throw err;
    }

    return updated;
};

const updateJobStatus = async (jobId, recruiterId, status) => {
    // Verify ownership
    const belongs = await Job.belongsToRecruiter(jobId, recruiterId);
    if (!belongs) {
        const err = new Error('Access denied');
        err.status = 403;
        throw err;
    }

    return await Job.updateStatus(jobId, status);
};

const deleteJob = async (jobId, recruiterId) => {
    // Verify ownership
    const belongs = await Job.belongsToRecruiter(jobId, recruiterId);
    if (!belongs) {
        const err = new Error('Access denied');
        err.status = 403;
        throw err;
    }

    const deleted = await Job.delete(jobId);
    if (!deleted) {
        const err = new Error('Job not found');
        err.status = 404;
        throw err;
    }

    return true;
};

const searchJobsForApplicant = async (applicantId) => {
    // Get applicant's domain
    const user = await User.findById(applicantId);
    if (!user || user.role !== 'applicant') {
        const err = new Error('Only applicants can search jobs');
        err.status = 403;
        throw err;
    }

    if (!user.domain) {
        const err = new Error('Please set your domain in profile to search jobs');
        err.status = 400;
        throw err;
    }

    // Search jobs matching applicant's domain
    return await Job.searchByDomain(user.domain);
};

module.exports = {
    createJob,
    getJobsByRecruiter,
    getJobById,
    updateJob,
    updateJobStatus,
    deleteJob,
    searchJobsForApplicant,
};