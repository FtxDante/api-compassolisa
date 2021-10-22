const CarSchema = require('../schema/carSchema');

class CarRepository {
  async create(carData) {
    return await CarSchema.create(carData);
  }

  async deleteOne(id) {    
    return await CarSchema.findByIdAndRemove(id);
  }
}

module.exports = new CarRepository();
