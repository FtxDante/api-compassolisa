/* eslint-disable require-jsdoc */
const carService = require('../service/carService');
class CarController {
  static async createCar(req, res) {
    const result = await carService.create(req.body);
    return res.status(201).json(result);
  }

  static async deleteOne(req, res) {
    const id = req.params.id;

    try {
      const result = await carService.deleteOne(id);

      if (result instanceof Error) {
        throw error;
      }

      return res.status(204).end();
    } catch (error) {
      return res.status(404).end();
    }
  }

  static async updateOneCar(req, res) {
    await carService.updateOneCar(req);
    return res.status(201).end();
  }

  static async getAllCars(req, res) {
    const result = await carService.findAll(req, res);
    return res.status(200).json(result);
  }

  static async getOneCar(req, res) {
    try {
      const {id} = req.params;
      const result = await carService.findById(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({message: error.message});
    }
  }
}

module.exports = CarController;
