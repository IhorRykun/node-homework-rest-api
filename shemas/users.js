const Joi = require("joi");

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required()
});

const loginSchenas = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required()
});

module.exports = {
  registerSchema,
  loginSchenas
};
