const Joi = require('joi');
const { objectId } = require('./custom.validation');

const validateCreatePlan = {
    body: Joi.object().keys({
        planName: Joi.string().trim().required().min(3).max(255),
        serviceId: Joi.string().custom(objectId),
        creditCount: Joi.number().integer().min(0).required(),
        planPrice: Joi.number().precision(2).required(), // Allows two decimal places
        description: Joi.string().trim().allow(null, ''), // Optional description
        duration: Joi.number().integer().min(1).optional(), // Allow optional duration with minimum 1
        durationUnit: Joi.string().trim().valid('day', 'week', 'month', 'year').optional(), // Allow optional duration unit with specific valid values

    }),
}


const validateStudentDetails = {
  body: Joi.object().keys({
    name: Joi.string().trim().required().min(3), // Name is required, minimum 3 characters
    email: Joi.string().trim().required().email(), // Email is required, valid format, and unique
    phone: Joi.string().optional().allow('', null), // Phone number is optional, allows empty string or null
    resume: Joi.string().trim().optional().uri({ scheme: ['http', 'https'] }), // Resume link is optional, valid URL (if provided)
    profilePic: Joi.string().trim().optional().uri({ scheme: ['http', 'https'] }), // Profile picture link is optional, valid URL (if provided)
    location: Joi.string().trim().optional(), // Location is optional
  }),
};





module.exports = {
    validateStudentDetails,
};
