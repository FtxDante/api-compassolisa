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

    static async createCar(req, res){
        const result = await carService.create(req.body);
        return res.status(201).json(result);
    }

    static async getAllCars(req, res){
        const result = await carService.findAll(req, res);
        return res.status(201).json(result);
    }

}

module.exports = CarController;
