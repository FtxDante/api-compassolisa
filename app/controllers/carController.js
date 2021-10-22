/* eslint-disable require-jsdoc */
const carService = require('../service/carService');
class CarController {
  static async createCar(req, res) {
    const result = await carService.create(req.body);
    return res.status(201).json(result);
  }

  static async updateOneCar(req, res) {
    await carService.updateOneCar(req, res);
    return res.status(201).end();
  }
}

module.exports = CarController;
