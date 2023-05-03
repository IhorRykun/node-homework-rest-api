const Joi = require("joi");

const registerSchemas = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required()
});

const loginSchemas = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required()
});

module.exports = {
  registerSchemas,
  loginSchemas
};
