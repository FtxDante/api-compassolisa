const { CarSchema } = require('../schema');
const Repository = require('./Repository');

class CarRepository extends Repository {
  constructor() {
    super(CarSchema);
  }

  async updateOneToAcessories(where, data, getNew = { new: true }) {
    const updateOne = await CarSchema.findOneAndUpdate(where, data, getNew);
    return updateOne;
  }
}
module.exports = new CarRepository();
