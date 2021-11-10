const RentalRepository = require('../repository/rentalRepository');

class RentalService {
  filter(req) {
    let params = { ...req.query };

    if (params.cep) {
      params['endereco.cep'] = params.cep;
      delete params.cep;
    } else if (params.logradouro) {
      params['endereco.logradouro'] = params.logradouro;
      delete params.logradouro;
    } else if (params.complemento) {
      params['endereco.complemento'] = params.complemento;
      delete params.complemento;
    } else if (params.bairro) {
      params['endereco.bairro'] = params.bairro;
      delete params.bairro;
    } else if (params.number) {
      params['endereco.number'] = params.number;
      delete params.number;
    } else if (params.localidade) {
      params['endereco.localidade'] = params.localidade;
      delete params.localidade;
    } else if (params.uf) {
      params['endereco.uf'] = params.uf;
      delete params.uf;
    } 

    console.log(params);
    return params;
  }

  teste() {
    console.log('Service Working');
  }

  async findAll(req) {
    const where = this.filter(req);
    console.log(where);
    const rentals = await RentalRepository.pagination(req, where);
    return rentals;
  }
}

module.exports = new RentalService();
