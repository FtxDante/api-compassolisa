const Joi = require('joi');

module.exports = async (req, res, next) =>{
  try {
    const carSchema = Joi.object({
      modelo: Joi.string()
          .trim(),

      cor: Joi.string()
          .trim(),

      ano: Joi.number()
          .min(1950)
          .max(2022),

      quantidadePassageiros: Joi.number()
          .min(2),
    })
        .or('modelo', 'cor', 'ano', 'acessorios', 'quantidadePassageiros')
        .required();

    const {error} = await carSchema.validate(req.body, {abortEarly: false});
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};
