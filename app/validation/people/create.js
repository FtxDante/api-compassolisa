const Joi = require('joi');

module.exports = async (req, res, next) =>{
    try{
        const peopleSchema = Joi.object({
            nome: Joi.string().required(),
            cpf:Joi.string().required(),
            data_nascimento: Joi.date().required(),
            email: Joi.string().email().required(),
            

        })

        const {error} = await peopleSchema.validate(req.body, {abortEarl: true});
        if (error) throw error;
        return next();

    }catch(error){
      return res.status(400).json({message: error.message});

    }

}