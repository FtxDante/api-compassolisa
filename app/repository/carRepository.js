const { CarSchema } = require('../schema');
const Repository = require('./Repository');

class CarRepository extends Repository {
  constructor() {
    super(CarSchema);
  }
}
module.exports = new CarRepository();
