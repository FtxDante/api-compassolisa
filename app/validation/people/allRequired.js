const {validator} = require('cpf-cnpj-validator');
const Joi = require('joi').extend(validator);

module.exports = async (req, res, next) =>{
  try {
    const peopleSchema = Joi.object({
      nome: Joi.string()
          .required(),
      cpf: Joi.document()
          .cpf()
          .required(),
      data_nascimento: Joi.date()
          .required()
          .custom( (value, helper) => {
            if ( (Date.now() - new Date(value) ) / 31556925974 > 18) {
              return true;
            } else {
              return helper.message('Must be at least 18 years old');
            }
          }),
      email: Joi.string().
          email().
          required(),
      senha: Joi.string()
          .min(6).
          required(),
      habilitado: Joi.string()
          .valid('sim', 'nao')
          .required(),

    });

    const {error} = await peopleSchema.validate(req.body, {abortEarly: false});
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};
