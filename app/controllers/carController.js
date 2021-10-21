const carService = require('../service/carService')

class CarController {
    static async createCar(req, res){
        const result = await carService.create(req.body);
        return res.status(201).json(result);
    }

    static async updateById(req, res) {
        const result = await carService.updateById(req.body);
        return res.status(201).json(result);
    }

}

module.exports = CarController;