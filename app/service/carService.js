/* eslint-disable require-jsdoc */
const CarRepository = require('../repository/carRepository');
const {UserRegistered, NotFound} = require('../errors');

class CarService {
  async updateOneCar(req) {
    await CarRepository.updateOne(req);
  }

  async searchUnique(req, res) {
    const {id} = req.params;

    const carFound = await CarRepository.findOne({id: id});
    if (carFound) {
      throw new UserRegistered();
    }
  }

  async create(dataCar) {
    const {modelo, cor, ano, acessorios, quantidadePassageiros} =
      await CarRepository.create(dataCar);

    return {
      modelo: modelo,
      cor: cor,
      ano: ano,
      acessorios: acessorios,
      quantidadePassageiros: quantidadePassageiros,
    };
  }

  async findAll(req, res) {
    return await CarRepository.formatOfPagination(req);
  }

  async findById(id) {
    const car = await CarRepository.findById(id);
    if (car == null) {
      throw new NotFound('id');
    } return car;
  }

  async deleteOne(id) {
    const {deletedCount} = await CarRepository.deleteOne(id);

    if (deletedCount == 0) {
      throw new NotFound('id');
    } else {
      return;
    }
  }
}

module.exports = new CarService();
