const CarRepository = require('../repository/carRepository');
const { NotFound } = require('../errors');

class CarService {
  filter(req) {
    const params = { ...req.query };
    if (params.descricao) {
      params['acessorios.descricao'] = params.descricao;
      delete params.descricao;
    }
    return params;
  }

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
    const where = this.filter(req);
    const cars = await CarRepository.pagination(req, where);
    return cars;
  }

  async findById(id) {
    const car = await CarRepository.findById(id);
    if (!car) {
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

  async updateAcessory(req) {
    const { id, idAcess } = req.params;
    const where = { 'acessorios._id': idAcess, _id: id };
    const { descricao } = req.body;
    const update = { 'acessorios.$.descricao': descricao };

    await this.findById(id);

    const updated = await CarRepository.updateOneToAcessories(where, { $set: update });

    return updated;
  }
}

module.exports = new CarService();
