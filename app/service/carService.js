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

  async updateById(req, res){
    try {
      const result = await CarRepository.updateById(id);
      return result;
    } catch(error){
      return error;
    }
  }
}

module.exports = new CarService();