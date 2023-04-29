const Joi = require("joi");

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required()
});

const loginSchenas = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required()
});

module.exports = {
  registerSchema,
  loginSchenas
};
