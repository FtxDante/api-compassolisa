const carService = require('../service/carService');

class CarController {
  static async createCar(req, res) {
    const result = await carService.create(req.body);
    return res.status(201).json(result);
  }

  static async deleteOne(req, res) {
    const id = req.params.id;

    const error = await carService.deleteOne({id: id});

    if (error) {
      return res.status(404).json();
    } else {
      return res.status(204).json();
    }
  }
}
module.exports = CarController;
