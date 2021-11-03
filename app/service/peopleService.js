const PeopleRepository = require('../repository/peopleRepository');
const { UserRegistered, NotFound } = require('../errors');

class PeopleService {
  async createPeople(peopleData, req) {
    await this.searchUnique(req);
    // eslint-disable-next-line camelcase
    const { nome, cpf, data_nascimento, email, habilitado } = await PeopleRepository.create(peopleData);

    return {
      nome,
      cpf,
      data_nascimento,
      email,
      habilitado
    };
  }

  async findAll(req) {
    const searchParams = this.createWhere(req.query);
    return await PeopleRepository.formatOfPagination(req, searchParams);
  }

  async findById(id) {
    const person = await PeopleRepository.findById(id);
    if (!person) {
      throw new NotFound('id');
    }
    person.senha = undefined;
    return person;
  }

  async updateOnePerson(req) {
    const { id } = req.params;
    await this.findById(id);
    await this.searchUnique(req);
    return await PeopleRepository.updateOne(req);
  }

  async searchUnique(req) {
    const { email, cpf } = req.body;

    const searchemail = await PeopleRepository.findOne({ email });
    const searchcpf = await PeopleRepository.findOne({ cpf });
    if (searchemail || searchcpf) {
      throw new UserRegistered();
    }
  }

  async deleteOne(id) {
    const wasDeleted = await PeopleRepository.deleteOne(id);

    if (!wasDeleted) {
      throw new NotFound('id');
    }
  }

  createWhere(params) {
    const where = { ...params };
    delete where.senha;
    delete where._id;
    delete where.id;
    delete where.page;
    delete where.limit;
    return where;
  }
}

module.exports = new PeopleService();
