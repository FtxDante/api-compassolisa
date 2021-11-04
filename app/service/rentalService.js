const RentalRepository = require('../repository/rentalRepository');
const { UserRegistered, NotFound } = require('../errors');

class RentalService {
  async create(rentalData, req) {
    // eslint-disable-next-line camelcase
    const { nome, cnpj, atividades, endereco } = await RentalRepository.create(rentalData);

    return {
      nome,
      cnpj,
      atividades,
      endereco
    };
  }
}

module.exports = new RentalService();
