const Joi = require('joi');

const updateProfileSchema = Joi.object({
    full_name: Joi.string().min(1).optional(),
    domain: Joi.string().min(1).optional().allow(null, ''),
}).min(1); // At least one field is required

const validateUpdateProfile = (req, res, next) => {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateUpdateProfile,
    updateProfileSchema,
};