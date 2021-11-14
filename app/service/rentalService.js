const RentalRepository = require('../repository/rentalRepository');
const { NotFound, CnpjInUse } = require('../errors');

class RentalServices {
  async create(req) {
    await this.searchUnique(req);
    const { nome, cnpj, atividades, endereco } = await RentalRepository.create(req.body);

    return {
      nome,
      cnpj,
      atividades,
      endereco
    };
  }

  async searchUnique(req) {
    const { cnpj } = req.body;

    const searchCnpj = await RentalRepository.findOne({ cnpj });

    if (searchCnpj) {
      throw new CnpjInUse(cnpj);
    }
  }

  async findById(id) {
    const rental = await RentalRepository.findById(id);
    if (!rental) {
      throw new NotFound('id');
    }
    return rental;
  }

  async updateOneRental(req) {
    const { id } = req.params;
    await this.findById(id);
    const updatedRental = await RentalRepository.updateOne(req);
    return updatedRental;
  }

  async deleteOneRental(id) {
    const wasDeleted = await RentalRepository.deleteOne(id);
    if (!wasDeleted) {
      throw new NotFound('id');
    }
  }
}

module.exports = new RentalServices();
