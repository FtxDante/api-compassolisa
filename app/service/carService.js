/* eslint-disable require-jsdoc */
const CarRepository = require('../repository/carRepository');
const {NotFound} = require('../errors');
const carRepository = require('../repository/carRepository');

class CarService {
  async updateOneCar(req) {
    await this.findById(req);
    return await CarRepository.updateOne(req);
  }

  async updateAItem(req) {
    await this.findById(req);
    return await carRepository.updateOne(req);
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
    const where = await this.filter(req);
    const cars = await CarRepository.formatOfPagination(req, where);
    return cars;
  }

  async findById(req) {
    const {id} = req.params;
    const car = await CarRepository.findById(id);
    if (!car) {
      throw new NotFound('id');
    } return car;
  }

  async deleteOne(id) {
    const wasDeleted = await CarRepository.deleteOne(id);

    if (!wasDeleted) {
      throw new NotFound('id');
    }
  }

  async filter(req) {
    const params = {...req.query};
    const value = params.acessorios;
    if (params.acessorios) {
      params.acessorios = {descricao: value};
    }
    const where = params;
    return where;
  }
}

module.exports = new CarService();
