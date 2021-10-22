/* eslint-disable require-jsdoc */
const CarSchema = require('../schema/carSchema');

class CarRepository {
  async create(carData) {
    return await CarSchema.create(carData);
  }

  async updateACar(req, res) {
    const {id} = req.params;
    const where = {_id: req.id};
    const update = req.body;
    return await CarSchema.findOneAndUpdate(where, update);
  }
}

module.exports = new CarRepository();
