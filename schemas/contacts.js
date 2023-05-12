const Joi = require("joi");

const addSchemas = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(5).max(12).required()
});

const updateSchemas = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string(),
  phone: Joi.string().min(5).max(12)
});

const updateFavoriteSchemas = Joi.object({
  favorite: Joi.boolean().required()
});

module.exports = {
  updateSchemas,
  addSchemas,
  updateFavoriteSchemas
};
