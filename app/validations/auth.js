const Joi = require("joi");
const {validationFormat} = require("@utils/validation-format");

const authValidate = (data) => {
  const userSchema = Joi.object({
    phone_number:
      Joi
        .string()
        .label('Telefon raqam')
        .trim()
        .pattern(new RegExp('^[0-9]{12}$'))
        .required()
        .messages({
          "string.empty": "{{#label}} bo'sh bo'lmasligi kerak",
          "any.required": "{{#label}} kiritish majburiy",
          "string.pattern.base": "{{#label}}ni to'g'ri kiriting"
        }),
    password:
      Joi
        .string()
        .label('Parol')
        .trim()
        .min(4)
        .max(50)
        .required()
        .messages({
          "string.empty": "{{#label}} bo'sh bo'lmasligi kerak",
          "any.required": "{{#label}} kiritish majburiy",
          "string.min": `{{#label}} kamida {{#limit}} ta belgidan iborat bo'lishi kerak`,
          "string.max": `{{#label}} maksimum {{#limit}} ta belgidan iborat bo'lishi kerak`
        }),
  });

  const {error} = userSchema.validate(data, {abortEarly: false});
  if (error) {
    return validationFormat(error)
  }
}

module.exports = {authValidate};