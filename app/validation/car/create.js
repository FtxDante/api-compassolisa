const Joi = require('joi');

module.exports = async (req, res, next) =>{
    try{
        const carSchema = Joi.object({
            modelo: Joi.string()
                .required(),

            cor: Joi.string()
                .required(),

            ano: Joi.number()
                .min(1950)
                .max(2022)
                .required(),

            acessorios: Joi.array().items(Joi.object({
                descricao: Joi.string()
                    .required()
            }))
                .min(1)
                .required(),
            
            quantidadePassageiros: Joi.number()
                .min(2)
                .required()
        })
        const { error } = await carSchema.validate(req.body,{ abortEarl: true })
        if(error) throw error;
        return next();
    }catch(error){
        return res.status(400).json({message: error.message})
    }
}