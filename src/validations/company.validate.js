const Joi = require('joi');
const { objectId } = require('./custom.validation'); // Assuming objectId is defined correctly

const validateCompanyDetails = {
  body: Joi.object().keys({
    name: Joi.string().trim().required().min(3), 
    rupees: Joi.number().default(200),
    website: Joi.string().uri({ scheme: ['http', 'https'] }).optional(), 
    teamSize: Joi.string().valid('1-10', '11-50', '50+').optional(),
    logo: Joi.string().uri({ scheme: ['http', 'https'] }).optional(),
    description: Joi.string().trim().optional(), 
  }),
};

const validateGetCompanyDetails = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(), 
  }),
};

const validateDeleteCompany = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(), 
  }),
};

const validateJobDetails = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(), 
  }),
  body: Joi.object().keys({
    jobRole: Joi.string().trim().required().min(3), 
    location: Joi.string().trim().required(),
    minCTC: Joi.number().required().min(0), 
    maxCTC: Joi.number().required().min(0), 
  }),

}

module.exports = {
  validateCompanyDetails,
  validateGetCompanyDetails,
  validateDeleteCompany,
  validateJobDetails
};
