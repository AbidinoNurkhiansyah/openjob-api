const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('', null),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('', null),
});

module.exports = { createCategorySchema, updateCategorySchema };
