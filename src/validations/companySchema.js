const Joi = require('joi');

const createCompanySchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().allow('', null),
});

const updateCompanySchema = Joi.object({
  name: Joi.string(),
  location: Joi.string(),
  description: Joi.string().allow('', null),
}).min(1);

module.exports = { createCompanySchema, updateCompanySchema };
