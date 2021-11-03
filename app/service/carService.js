const CarRepository = require('../repository/carRepository');
const { NotFound } = require('../errors');

function filter(req) {
  const params = { ...req.query };
  const value = params.acessorios;
  if (params.acessorios) {
    params.acessorios = { descricao: value };
  }
  const where = params;
  return where;
}
class CarService {
  async updateOneCar(req) {
    const { id } = req.params;
    await this.findById(id);
    const updateOneCar = await CarRepository.updateOne(req);
    return updateOneCar;
  }

  async create(dataCar) {
    const { _id, modelo, cor, ano, acessorios, quantidadePassageiros } = await CarRepository.create(dataCar);

    return {
      _id,
      modelo,
      cor,
      ano,
      acessorios,
      quantidadePassageiros
    };
  }

  async findAll(req) {
    const where = await filter(req);
    const cars = await CarRepository.pagination(req, where);
    return cars;
  }

  async findById(id) {
    const car = await CarRepository.findById(id);
    if (car === null) {
      throw new NotFound('id');
    }
    return car;
  }

  async deleteOne(id) {
    const wasDeleted = await CarRepository.deleteOne(id);

    if (!wasDeleted) {
      throw new NotFound('id');
    }
  }
}

module.exports = new CarService();
