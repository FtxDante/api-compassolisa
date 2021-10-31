
const Joi = require('joi');

module.exports = async (req, res, next) =>{
  try {
    // eslint-disable-next-line new-cap
    const idParam = new Joi.object({
      id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/),

    });

    const {error} = await idParam.validate(req.params, {abortEarly: false});
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};
