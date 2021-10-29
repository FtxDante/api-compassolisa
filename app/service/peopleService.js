const PeopleRepository = require('../repository/peopleRepository');

class PeopleService {
  async createPeople(peopleData) {
    try {
      // eslint-disable-next-line camelcase
      const {nome, cpf, data_nascimento, email, habilitado} =
        await PeopleRepository.create(peopleData);

      return {
        nome: nome,
        cpf: cpf,
        data_nascimento: data_nascimento,
        email: email,
        habilitado: habilitado,
      };
    } catch (error) {
      return error;
    }
  }

  async findAll(req, res) {
    try {
      const searchParams = this.createWhere(req.query);
      return await PeopleRepository.formatOfPagination(req, searchParams);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  }

  async findById(id) {
    try {
      const person = await PeopleRepository.findById(id);
      if (person == null) {
        throw new Error('id not found');
      }
      person.senha = undefined;
      return person;
    } catch (error) {
      throw error;
    }
  }

  async updateOnePerson(req) {
    await this.searchUnique(req);
    return await PeopleRepository.updateOne(req);
  }

  async searchUnique(req, res) {
    const {email, cpf} = req.body;

    const searchemail = await PeopleRepository.findOne({email: email});
    const searchcpf = await PeopleRepository.findOne({cpf: cpf});
    if (searchemail || searchcpf) {
      throw new Error('User already registered.');
    }
  }

  async deleteOne(id) {
    try {
      const {deletedCount} = await PeopleRepository.deleteOne(id);

      if (deletedCount == 0) {
        throw new Error('id not found');
      } else {
        return;
      }
    } catch (error) {
      return error;
    }
  }

  createWhere(params) {
    const where = {...params};
    delete where.senha;
    delete where._id;
    delete where.id;
    delete where.page;
    delete where.limit;
    return where;
  }
}

module.exports = new PeopleService();
