/* eslint-disable require-jsdoc */
const CarRepository = require('../repository/carRepository');

class CarService {
  async updateOneCar(req) {
    try {
      await CarRepository.updateOne(req);
    } catch (error) {
      return error;
    }
  }

  async create(dataCar) {
    try {
      const {modelo, cor, ano, acessorios, quantidadePassageiros} =
        await CarRepository.create(dataCar);

      return {
        modelo: modelo,
        cor: cor,
        ano: ano,
        acessorios: acessorios,
        quantidadePassageiros: quantidadePassageiros,
      };
    } catch (error) {
      return error;
    }
  }

  async findAll(req, res) {
    const where = filter(req);
    try {
      const cars = await CarRepository.formatOfPagination(req, where);
      if (cars.total === 0) {
        throw new Error('no car was found with this parameters, please verify');
      }
      return cars;
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  }

  async findById(id) {
    try {
      const car = await CarRepository.findById(id);
      if (car == null) {
        throw new Error('id not found');
      } return car;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id) {
    try {
      const {deletedCount} = await CarRepository.deleteOne(id);

      if (deletedCount == 0) {
        throw new Error('id not found');
      } else {
        return;
      }
    } catch (error) {
      return error;
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
  console.log(where);
  return where;
}

module.exports = new CarService();
