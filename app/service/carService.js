/* eslint-disable require-jsdoc */
const CarRepository = require('../repository/carRepository');
const {NotFound} = require('../errors');

class CarService {
  async updateOneCar(req, res) {
    const {id} = req.params;
    await this.findById(id);
    return await CarRepository.updateOne(req);
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
    const where = await filter(req);
    const cars = await CarRepository.formatOfPagination(req, where);
    return cars;
  }

  async findById(id) {
    const car = await CarRepository.findById(id);
    if (car === null) {
      throw new Error('id not found');
    } return car;
  }

  async deleteOne(id) {
    const wasDeleted = await CarRepository.deleteOne(id);

    if (!wasDeleted) {
      throw new NotFound('id');
    }
  }
}

function filter(req) {
  const params = {...req.query};

  const value = params.acessorios;
  if (params.acessorios) {
    params.acessorios = {descricao: value};
  }

  const where = params;
  return where;
}

module.exports = new CarService();
