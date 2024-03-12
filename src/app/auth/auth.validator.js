const joi = require("joi");

const registerSchema = joi.object({
  name: joi.string().max(30).required(),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com"] } }),
  token: joi.string().min(15).max(15),
});

const passwordSchema = joi.object({
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,20}$")).required(),
  confirmPassword: joi.ref("password"),
});

const loginSchema = joi.object({
  name: joi.string().max(30).required(),
  password: joi.string().required(),
});

module.exports = { registerSchema, passwordSchema, loginSchema };
