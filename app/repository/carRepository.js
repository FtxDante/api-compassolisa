const CarSchema = require('../schema/carSchema');

class CarRepository {
    async create(carData) {
        return await CarSchema.create(carData);
    }

    async updateACar(req, res){
        const {id} = req.params;
        const filter = { _id: req.id };
        const update = req.body;
        return await CarSchema.findOneAndUpdate(filter, update);
    }
}

module.exports = new CarRepository();