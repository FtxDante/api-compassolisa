/* eslint-disable require-jsdoc */
const CarRepository = require('../repository/carRepository');
const {NotFound} = require('../errors');

class CarService {
  async updateOneCar(req) {
    await CarRepository.updateOne(req);
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

  async findAll(req) {
    return await CarRepository.formatOfPagination(req);
  }

  async findById(id) {
    const car = await CarRepository.findById(id);
    if (car == null) {
      throw new NotFound('id');
    } return car;
  }

  async deleteOne(id) {
    const wasDeleted = await CarRepository.deleteOne(id);

    if (!wasDeleted) {
      throw new NotFound('id');
    }
  }
}

module.exports = new CarService();
