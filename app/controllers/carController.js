const carService = require('../service/carService');

class CarController {
  static async createCar(req, res) {
    const result = await carService.create(req.body);
    return res.status(201).json(result);
  }

  static async deleteOne(req, res) {
    const {id} = req.params;

    try {
      const result = await carService.deleteOne({id});

      if (result instanceof Error) {
        throw error;
      }

      return res.status(204).end();
    } catch (error) {
      return res.status(404).end();
    }
  }
}
module.exports = CarController;
