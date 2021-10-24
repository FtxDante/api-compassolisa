const peopleSchema = require('../schema/peopleSchema');

class PeopleRepository {
  async create(peopleData) {
    return await peopleSchema.create(peopleData);
  }
  async findAll(where = {}, page = null, limit = null) {
    return await peopleSchema .find(where) .skip(page * limit) .limit(limit);
  }

  async pagination(req, where = {}) {
    try {
      let {page = 0, limit = 100} = req.query;

      if (page > 0) page -= 1;

      const data = await this.findAll(where, Number(page), Number(limit));

      const dataTotal = await this.findAll(where);

      const formatedData = data.map((person) => {
        return {
          id: person._id,
          nome: person.nome,
          cpf: person.cpf,
          data_nascimento: person.data_nascimento,
          email: person.email,
          habilitado: person.habilitado,
        };
      });
      return {
        pessoas: formatedData,
        total: dataTotal.length,
        limit: Number(limit),
        offset: page + 1,
        offsets: Math.ceil(dataTotal.length / limit),
      };
    } catch (error) {
      return error;
    }
  }
}

module.exports = new PeopleRepository();
