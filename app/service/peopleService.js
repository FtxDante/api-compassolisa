const PeopleRepository = require('../repository/peopleRepository');
const { CpfInUse, EmailInUse, NotFound } = require('../errors');

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
    const people = await PeopleRepository.pagination(req, searchParams);
    return people;
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
    const updateOnePerson = await PeopleRepository.updateOne(req);
    return updateOnePerson;
  }

  async searchUnique(req) {
    const { email, cpf } = req.body;

    const searchemail = await PeopleRepository.findOne({ email });
    const searchcpf = await PeopleRepository.findOne({ cpf });
    if (searchemail) {
      throw new EmailInUse(email);
    }

    if(searchcpf){
      throw new CpfInUse(cpf);
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
    delete where.id;
    delete where.page;
    delete where.limit;
    return where;
  }
}

module.exports = new PeopleService();
