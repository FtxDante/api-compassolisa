const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const carSchema = Joi.object({
      descricao: Joi.string().trim().required()
    });

    let { error } = await carSchema.validate(req.body, { abortEarly: false });

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
