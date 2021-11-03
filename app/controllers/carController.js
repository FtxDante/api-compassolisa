const {handleErrors} = require('../errors');
/* eslint-disable require-jsdoc */
const carService = require('../service/carService');
class CarController {
  static async createCar(req, res) {
    try {
      const result = await carService.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json({message: error.message});
    }
  }

  static async deleteOne(req, res) {
    const id = req.params.id;

    try {
      await carService.deleteOne(id);

      return res.status(204).end();
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json({message: error.message});
    }
  }

  static async updateOneCar(req, res) {
    try {
      const result = await carService.updateOneCar(req, res);
      return res.status(200).json(result);
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json({message: error.message});
    }
  }

  static async getAllCars(req, res) {
    try {
      const result = await carService.findAll(req, res);
      return res.status(200).json(result);
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json({message: error.message});
    }
  }

  static async getOneCar(req, res) {
    try {
      const result = await carService.findById(req);
      return res.status(200).json(result);
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json({message: error.message});
    }
  }

  static async updateCarInfo(req, res) {
    try {
      const result = await carService.updateAItem(req);
      res.status(200).json(result);
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json({message: error.message});
    }
  }
}

module.exports = CarController;
