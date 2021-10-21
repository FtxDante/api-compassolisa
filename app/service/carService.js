const CarRepository = require('../repository/carRepository');

class CarService {
  async create(dataCar) {
    try {
      const result = await CarRepository.create(dataCar);
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteOne(id) {
    try {
      const {deletedCount} = await CarRepository.deleteOne(id);

      if (deletedCount == 0) {
        throw new Error('id not found');
      } else {
        return;
      }
    } catch (error) {
      return error;
    }
  }
}

module.exports = new CarService();
