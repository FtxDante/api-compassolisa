const axios = require('axios');
const { NotFound } = require('../../../app/errors');

class GetCepData {
  async getData(cep) {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    if (data.erro) {
      throw new NotFound(cep);
    }
    return data;
  }
}

module.exports = new GetCepData();
