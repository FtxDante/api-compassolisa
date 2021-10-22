/* eslint-disable require-jsdoc */
const CarSchema = require('../schema/carSchema');

class CarRepository {
  async create(carData) {
    return await CarSchema.create(carData);
  }

  async updateOneCar(req, res) {
    // eslint-disable-next-line new-cap
    const where = {id: req.id};
    const update = req.body;
    await CarSchema.updateOne(where, update);
  }
}

module.exports = new CarRepository();
