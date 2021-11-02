const {validator} = require('cpf-cnpj-validator');
const {errosName} = require('../../errors');
const Joi = require('joi').extend(validator);

module.exports = async (req, res, next) =>{
  try {
    const peopleSchema = Joi.object({
      nome: Joi.string()
          .trim()
          .required(),
      cpf: Joi.document()
          .cpf()
          .required()
          .custom((value, helper)=>{
            const cpf2 = value.replace(/[^0-9]/g, '')
                .replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.$2.$3-$4');
            if (cpf2 !== value) {
              return helper.message(errosName.invalidCpf);
            }
          }),
      data_nascimento: Joi.date()
          .required()
          .custom( (value, helper) => {
            if ( (Date.now() - new Date(value) ) / 31556925974 > 18) {
              return true;
            } else {
              return helper.message(errosName.minor);
            }
          }),
      email: Joi.string()
          .email()
          .required(),
      senha: Joi.string()
          .min(6)
          .required(),
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
