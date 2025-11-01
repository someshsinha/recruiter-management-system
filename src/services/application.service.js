const Application = require('../models/application.model');
const Job = require('../models/job.model');
const ATSScoreHistory = require('../models/ats_score_history.model');
const { calculateATSScore } = require('./ats.service');

exports.createApplication = async (job_id, applicant_id, resume_path) => {
    const job = await Job.findByPk(job_id);
    if (!job) throw new Error('Job not found');

    // Calculate ATS score
    const ats_score = await calculateATSScore(resume_path, job.description);

    const application = await Application.create({
        job_id,
        applicant_id,
        recruiter_id: job.recruiter_id,
        resume_path,
        ats_score,
    });

    return application;
};

exports.getApplications = async (filter = {}) => {
    return Application.findAll({ where: filter });
};

exports.updateStatus = async (applicationId, newStatus) => {
    const app = await Application.findByPk(applicationId);
    if (!app) throw new Error('Application not found');

    const prevScore = app.ats_score;

    await app.update({ status: newStatus });

    await ATSScoreHistory.create({
        application_id: app.id,
        previous_score: prevScore,
        new_score: app.ats_score,
    });

    return app;
};
