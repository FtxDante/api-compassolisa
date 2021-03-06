const { handleErrors } = require('../errors');
const { carPaginateSerializer, carSerializer } = require('../serialize/CarSerializer');
/* eslint-disable require-jsdoc */
const carService = require('../service/carService');

class CarController {
  static async createCar(req, res) {
    const result = await carService.create(req.body);
    return res.status(201).json(carSerializer(result));
  }

  static async deleteOne(req, res) {
    const { id } = req.params;

    try {
      await carService.deleteOne(id);

      return res.status(204).end();
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json(error);
    }
  }

  static async updateOneCar(req, res) {
    try {
      const result = await carService.updateOneCar(req, res);
      return res.status(200).json(carSerializer(result));
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json(error);
    }
  }

  static async getAllCars(req, res) {
    try {
      const result = await carService.findAll(req, res);
      return res.status(200).json(carPaginateSerializer(result));
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json(error);
    }
  }

  static async getOneCar(req, res) {
    try {
      const { id } = req.params;
      const result = await carService.findById(id);
      return res.status(200).json(carSerializer(result));
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json(error);
    }
  }

  static async updateAcessory(req, res) {
    try {
      const result = await carService.updateAcessory(req);
      return res.status(200).json(result);
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json(error);
    }
  }
}

module.exports = CarController;
