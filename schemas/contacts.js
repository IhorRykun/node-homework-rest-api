const Joi = require("joi");

const addSchemas = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.base": `"a" should be a type of 'text'`,
    "string.empty": `"a" cannot be an empty field`,
    "string.min": `"a" should have a minimum length of {#limit}`,
    "any.required": `"a" is a required field`
  }),
  email: Joi.string().required().messages({
    "string.base": `"a" should be a type of 'text'`,
    "string.empty": `"a" cannot be an empty field`,
    "string.min": `"a" should have a minimum length of {#limit}`,
    "any.required": `"a" is a required field`
  }),
  phone: Joi.string().min(5).max(12).required().messages({
    "string.base": `"a" should be a type of 'text'`,
    "string.empty": `"a" cannot be an empty field`,
    "string.min": `"a" should have a minimum length of {#limit}`,
    "any.required": `"a" is a required field`
  })
});

const updateSchemas = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    "string.base": `"a" should be a type of 'text'`,
    "string.empty": `"a" cannot be an empty field`,
    "string.min": `"a" should have a minimum length of {#limit}`
  }),
  email: Joi.string().messages({
    "string.base": `"a" should be a type of 'text'`,
    "string.empty": `"a" cannot be an empty field`,
    "string.min": `"a" should have a minimum length of {#limit}`
  }),
  phone: Joi.string().min(5).max(12).messages({
    "string.base": `"a" should be a type of 'text'`,
    "string.empty": `"a" cannot be an empty field`,
    "string.min": `"a" should have a minimum length of {#limit}`
  })
});

const updateFavoriteSchemas = Joi.object({
  favorite: Joi.boolean().required()
});

module.exports = {
  updateSchemas,
  addSchemas,
  updateFavoriteSchemas
};
