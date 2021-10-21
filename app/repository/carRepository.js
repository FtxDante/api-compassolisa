const CarSchema = require('../schema/carSchema');

class CarRepository {
    async create(carData) {
        return await CarSchema.create(carData);
    }
}

module.exports = new CarRepository();