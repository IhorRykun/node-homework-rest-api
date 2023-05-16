const Joi = require("joi");

const registerSchemas = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  name: Joi.string().min(3).required()
});

const loginSchemas = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required()
});

const EmailSchemas = Joi.object({
  email: Joi.string().required()
});

module.exports = {
  registerSchemas,
  loginSchemas,
  EmailSchemas
};
