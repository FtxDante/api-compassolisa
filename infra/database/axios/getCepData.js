const axios = require('axios');

class GetCepData {
  async getData(cep) {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    return data;
  }
}

module.exports = new GetCepData();
