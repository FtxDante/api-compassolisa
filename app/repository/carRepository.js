const { NotFound } = require('../errors');
const { CarSchema } = require('../schema');
const Repository = require('./Repository');

class CarRepository extends Repository {
  constructor() {
    super(CarSchema);
  }

  async updateOneToAcessories(where, data, getNew = { new: true }) {
    const updated = await CarSchema.findOneAndUpdate(where, data, getNew);

    if (!updated) {
      throw new NotFound('Acessory');
    }

    return updated;
  }
}
module.exports = new CarRepository();
