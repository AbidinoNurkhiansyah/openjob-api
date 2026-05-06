const Joi = require('joi');

const createCompanySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('', null),
});

const updateCompanySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('', null),
});

module.exports = { createCompanySchema, updateCompanySchema };
