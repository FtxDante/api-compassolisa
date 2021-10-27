const Repository = require('./Repository');
class PeopleRepository extends Repository {
  constructor() {
    super('PeopleSchema');
  }

  async formatOfPagination(req, where = {}) {
    const {
      data,
      dataTotal,
      page,
      limit,
    } = await this.pagination(req, where);

    const formatedData = await data.map((person) => {
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
  }
}
module.exports = new PeopleRepository();
