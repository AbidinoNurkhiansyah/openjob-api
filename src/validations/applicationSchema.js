const Joi = require('joi');

const createApplicationSchema = Joi.object({
  job_id: Joi.string().required(),
});

const updateApplicationSchema = Joi.object({
  status: Joi.string().valid('pending', 'accepted', 'rejected').required(),
});

module.exports = { createApplicationSchema, updateApplicationSchema };
