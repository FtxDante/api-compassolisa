const RentalRepository = require('../repository/rentalRepository');
const { UserRegistered } = require('../errors');

class RentalService {
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
      throw new UserRegistered();
    }
  }
}

module.exports = new RentalService();
