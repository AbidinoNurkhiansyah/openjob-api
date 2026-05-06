const Joi = require('joi');

const createJobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  company_id: Joi.string().required(),
  category_id: Joi.string().required(),
});

const updateJobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  company_id: Joi.string().required(),
  category_id: Joi.string().required(),
});

module.exports = { createJobSchema, updateJobSchema };
