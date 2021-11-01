const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const carSchema = Joi.object({
      modelo: Joi.string().trim().required(),

      cor: Joi.string().trim().required(),

      ano: Joi.number().min(1950).max(2022).required(),

      acessorios: Joi.array()
        .items(
          Joi.object({
            descricao: Joi.string().trim().required()
          }).unknown(true)
        )
        .unique((a, b) => a.descricao === b.descricao)
        .min(1)
        .required(),

      quantidadePassageiros: Joi.number().min(2).required()
    });
    const { error } = await carSchema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
