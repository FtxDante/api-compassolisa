/* eslint-disable require-jsdoc */
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

  async updateOneCar(req, res) {
    try {
      await CarRepository.updateOneCar(req, res);
    } catch (error) {
      return error;
    }
  }
}

module.exports = new CarService();
