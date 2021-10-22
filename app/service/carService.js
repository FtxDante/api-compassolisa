const CarRepository = require('../repository/carRepository')

class CarService {
    async create(dataCar){
        try{
            const {modelo, cor, ano, acessorios,quantidadePassageiros} = await CarRepository.create(dataCar);

            return {
                modelo: modelo,
                cor: cor,
                ano: ano,
                acessorios: acessorios,
                quantidadePassageiros: quantidadePassageiros
            };
        }catch(error){
            return error;
        }
    }

    async findAll(req, res){
        try{
            const result = await CarRepository.pagination(req)
            return result;
        }catch(error){
            return res.status(400).json({message: error.message});
        }
    }

}

module.exports = new CarService();