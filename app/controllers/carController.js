const carService = require('../service/carService')

class CarController {
    static async createCar(req, res){
        const result = await carService.create(req.body);
        return res.status(201).json(result);
    }

    static async updateACar(req, res) {
        const result = await carService.updateACar(req.body);
        return res.status(201).json(result);
    }

}

module.exports = CarController;