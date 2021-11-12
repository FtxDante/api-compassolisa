const { validator } = require('cpf-cnpj-validator');
const Joi = require('joi').extend(validator);

module.exports = async (req, res, next) => {
  try {
    const RentalSchema = Joi.object({
      nome: Joi.string().trim().required(),

      cnpj: Joi.string().trim().required(),

      atividades: Joi.string().trim().required(),

      endereco: Joi.array()
        .items(
          Joi.object({
            cep: Joi.string().trim().required(),
            number: Joi.number().required(),
            complemento: Joi.string().trim(),
            isFilial: Joi.boolean().required()
          }).unknown(true)
        )
        .unique((a, b) => a.cep === b.cep)
        .min(1)
        .required()
    });
    const { error } = await RentalSchema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
