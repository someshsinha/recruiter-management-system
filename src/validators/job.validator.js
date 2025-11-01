const Joi = require('joi');

const createJobSchema = Joi.object({
    client_id: Joi.string().uuid().required(),
    title: Joi.string().min(1).max(255).required(),
    domain: Joi.string().min(1).max(50).required(),
    location: Joi.string().min(1).max(100).required(),
    job_type: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).required(),
    requirements: Joi.string().min(1).required(),
    salary_range: Joi.string().min(1).max(50).optional(),
    status: Joi.string().valid('active', 'on_hold', 'filled').optional(),
});

const updateJobSchema = Joi.object({
    title: Joi.string().min(1).max(255).optional(),
    domain: Joi.string().min(1).max(50).optional(),
    location: Joi.string().min(1).max(100).optional(),
    job_type: Joi.string().min(1).max(50).optional(),
    description: Joi.string().min(1).optional(),
    requirements: Joi.string().min(1).optional(),
    salary_range: Joi.string().min(1).max(50).optional(),
    status: Joi.string().valid('active', 'on_hold', 'filled').optional(),
}).min(1);

const updateJobStatusSchema = Joi.object({
    status: Joi.string().valid('active', 'on_hold', 'filled').required(),
});

const validateCreateJob = (req, res, next) => {
    const { error } = createJobSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateUpdateJob = (req, res, next) => {
    const { error } = updateJobSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateUpdateJobStatus = (req, res, next) => {
    const { error } = updateJobStatusSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateCreateJob,
    validateUpdateJob,
    validateUpdateJobStatus,
    createJobSchema,
    updateJobSchema,
    updateJobStatusSchema,
};