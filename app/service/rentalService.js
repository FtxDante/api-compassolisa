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

  filter(req) {
    const params = { ...req.query };

    if (params.cep) {
      params['endereco.cep'] = params.cep;
      delete params.cep;
    }
    if (params.logradouro) {
      params['endereco.logradouro'] = params.logradouro;
      delete params.logradouro;
    }
    if (params.complemento) {
      params['endereco.complemento'] = params.complemento;
      delete params.complemento;
    }
    if (params.bairro) {
      params['endereco.bairro'] = params.bairro;
      delete params.bairro;
    }
    if (params.number) {
      params['endereco.number'] = params.number;
      delete params.number;
    }
    if (params.localidade) {
      params['endereco.localidade'] = params.localidade;
      delete params.localidade;
    }
    if (params.uf) {
      params['endereco.uf'] = params.uf;
      delete params.uf;
    }

    return params;
  }

  async findAll(req) {
    const where = this.filter(req);
    const rentals = await RentalRepository.pagination(req, where);
    return rentals;
  }
}

module.exports = new RentalServices();
