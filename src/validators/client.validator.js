const Joi = require('joi');

const createClientSchema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    industry: Joi.string().min(1).max(50).optional(),
    website: Joi.string().uri().optional(),
    company_size: Joi.number().integer().min(1).optional(),
});

const updateClientSchema = Joi.object({
    name: Joi.string().min(1).max(100).optional(),
    industry: Joi.string().min(1).max(50).optional(),
    website: Joi.string().uri().optional(),
    company_size: Joi.number().integer().min(1).optional(),
}).min(1);

const validateCreateClient = (req, res, next) => {
    const { error } = createClientSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateUpdateClient = (req, res, next) => {
    const { error } = updateClientSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateCreateClient,
    validateUpdateClient,
    createClientSchema,
    updateClientSchema,
};