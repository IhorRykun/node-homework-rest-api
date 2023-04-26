const Joi = require("joi");

const addSchemas = Joi.object({
  name: Joi.string().min(6).max(20).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(5).max(12).required()
});

const updateSchemas = Joi.object({
  name: Joi.string().min(6).max(20),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
  }),
  phone: Joi.string().min(5).max(12)
});

module.exports = {
  updateSchemas,
  addSchemas
};
