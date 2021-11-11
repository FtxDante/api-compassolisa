const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const rentalSchema = Joi.object({
      nome: Joi.string().trim().required(),
      cnpj: Joi.string().trim().required(),
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

    const { error } = await rentalSchema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
