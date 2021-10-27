const {validator} = require('cpf-cnpj-validator');

const Joi = require('joi').extend(validator);

module.exports = async (req, res, next) =>{
  try {
    const peopleSchema = Joi.object({
      nome: Joi.string()
          .required(),
      cpf: Joi.document()
          .cpf()
          .required()
          .custom((value, helper)=>{
            const cpf2 = value.replace(/[^0-9]/g, '')
                .replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.$2.$3-$4');
            if (cpf2 !== value) {
              return helper.message('Invalid CPF');
            }
          }),
      data_nascimento: Joi.date()
          .required(),
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

    const {error} = await peopleSchema.validate(req.body, {abortEarl: false});

    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};
