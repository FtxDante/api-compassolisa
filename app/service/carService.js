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
      const {modelo, cor, ano, acessorios, quantidadePassageiros,
      } = await CarRepository.create(dataCar);

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
  };
  async findAll(req, res) {
    try {
      return await CarRepository.formatOfPagination(req);
    } catch (error) {
      return res.status(400).json({message: error.message});
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

module.exports = new CarService();
