const CarRepository = require('../repository/carRepository')

class CarService {
    async create(dataCar){
        try{
            const result = await CarRepository.create(dataCar);
            return result;
        }catch(error){
            return error;
        }
    }

    async find(req, res){
        try{
            const result = await CarRepository.pagination(req)
            return result;
        }catch(error){
            return res.status(400).json({message: error.message});
        }
    }

}

module.exports = new CarService();