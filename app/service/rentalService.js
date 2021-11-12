const RentalRepository = require('../repository/rentalRepository');

class RentalService {
  filter(req) {
    let params = { ...req.query };

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

  teste() {
    console.log('Service Working');
  }

  async findAll(req) {
    const where = this.filter(req);
    const rentals = await RentalRepository.pagination(req, where);
    return rentals;
  }
}

module.exports = new RentalService();
