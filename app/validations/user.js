const Joi = require('joi');
const {validationFormat} = require("@utils/validation-format");

const userValidate = (data, is_optional) => {
  const userSchema = Joi.object({
    id: Joi.forbidden(),
    full_name:
      Joi
        .string()
        .label("Ism va familya")
        .trim()
        .min(3)
        .max(50)
        .when('$is_optional', {
          is: true,
          then: Joi.optional(),
          otherwise: Joi.required()
        })
        .messages({
          "string.empty": "{{#label}} bo'sh bo'lmasligi kerak",
          "any.required": "{{#label}} kiritish majburiy",
          "string.min": `{{#label}} kamida {{#limit}} ta belgidan iborat bo'lishi kerak`,
          "string.max": `{{#label}} maksimum {{#limit}} ta belgidan iborat bo'lishi kerak`
        }),
    phone_number:
      Joi
        .string()
        .label('Telefon raqam')
        .trim()
        .pattern(new RegExp('^[0-9]{12}$'))
        .when('$is_optional', {
          is: true,
          then: Joi.optional(),
          otherwise: Joi.required()
        })
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
        .when('$is_optional', {
          is: true,
          then: Joi.optional(),
          otherwise: Joi.required()
        })
        .messages({
          "string.empty": "{{#label}} bo'sh bo'lmasligi kerak",
          "any.required": "{{#label}} kiritish majburiy",
          "string.min": `{{#label}} kamida {{#limit}} ta belgidan iborat bo'lishi kerak`,
          "string.max": `{{#label}} maksimum {{#limit}} ta belgidan iborat bo'lishi kerak`
        }),
  });

  const {error} = userSchema.validate(data, {abortEarly: false, context: {is_optional}});
  if (error) {
    return validationFormat(error)
  }
}

module.exports = {userValidate};