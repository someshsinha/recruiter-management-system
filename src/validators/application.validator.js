const Joi = require('joi');

exports.validateApplication = (data) => {
    const schema = Joi.object({
        job_id: Joi.string().uuid().required(),
    });

    return schema.validate(data);
};
