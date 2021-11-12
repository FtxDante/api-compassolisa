const { validator } = require('cpf-cnpj-validator');
const Joi = require('joi').extend(validator);
const { errosName } = require('../../errors');

module.exports = async (req, res, next) => {
  try {
    const peopleSchema = Joi.object({
      nome: Joi.string().trim().required(),

      cpf: Joi.document()
        .cpf()
        .required()
        .min(14)
        .max(14)
        .regex(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/)
        .messages({
          'document.cpf': `CPF ${req.body.cpf} is invalid `,
          'string.pattern.base': `CPF ${req.body.cpf} format is invalid `
        }),

      data_nascimento: Joi.date()
        .required()
        .custom((value, helper) => {
          if ((Date.now() - new Date(value)) / 31556925974 > 18) {
            return true;
          }
          return helper.message(errosName.minor);
        }),

      email: Joi.string()
        .email()
        .required()
        .messages({
          'string.email': `Email ${req.body.email} is invalid `
        }),

      senha: Joi.string().min(6).required(),

      habilitado: Joi.string().valid('sim', 'nao').required()
    });

    let { error } = await peopleSchema.validate(req.body, { abortEarly: false });
    if (error) {
      error = error.details.map((details) => ({
        description: details.context.label,
        name: details.message
      }));
      throw error;
    }

    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
