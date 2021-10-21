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

    async updateACar(id){
        try {
            const result = await CarRepository.updateACar(id);
            return result;
        } catch(error){
            return error;
        }
    }
}

module.exports = new CarService();