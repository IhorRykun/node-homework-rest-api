const Joi = require("joi");

const addShemas = Joi.object({
  name: Joi.string().min(6).max(20).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(10).max(12).required()
});

module.exports = addShemas;
