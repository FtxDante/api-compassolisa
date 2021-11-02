const Joi = require('joi');

module.exports = async (req, res, next) =>{
  try {
    const authSchema = Joi.object({
      email: Joi.string()
          .email()
          .required(),

      senha: Joi.string()
          .min(6)
          .required(),
    });

    const {error} = authSchema.validate(req.body, {abortEarly: false});
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};
