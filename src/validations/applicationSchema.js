const Joi = require('joi');

const createApplicationSchema = Joi.object({
  user_id: Joi.string().required(),
  job_id: Joi.string().required(),
  status: Joi.string().valid('pending', 'accepted', 'rejected').default('pending'),
});

const updateApplicationSchema = Joi.object({
  status: Joi.string().valid('pending', 'accepted', 'rejected').required(),
});

module.exports = { createApplicationSchema, updateApplicationSchema };
