const { validator } = require('cpf-cnpj-validator');
const Joi = require('joi').extend(validator);

module.exports = async (req, res, next) => {
  try {
    const rentalSchema = Joi.object({
      nome: Joi.string().trim().required(),

      cnpj: Joi.document()
        .cnpj()
        .required()
        .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
        .messages({
          'document.cnpj': `CNPJ ${req.body.cnpj} is invalid `,
          'string.pattern.base': `CNPJ ${req.body.cnpj} format is invalid `
        }),

      atividades: Joi.string().trim().required(),

      endereco: Joi.array()
        .items(
          Joi.object({
            cep: Joi.string().trim().required(),
            number: Joi.string().trim().required(),
            complemento: Joi.string().trim(),
            isFilial: Joi.boolean().required()
          }).unknown(true)
        )
        .custom((itens, helper) => {
          let notFilial = 0;
          itens.forEach((item) => {
            if (item.isFilial === false) {
              notFilial += 1;
            }
          });
          if (notFilial > 1) {
            return helper.message('Only one head office is allowed');
          }
          if (notFilial < 1) {
            return helper.message('At least one head office is required');
          }
          return true;
        })
        .required()
    });

    let { error } = await rentalSchema.validate(req.body, { abortEarly: false });

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
