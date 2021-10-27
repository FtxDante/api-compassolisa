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
      return await PeopleRepository.formatOfPagination(req);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
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
    const where ={...params};
    delete where.id;
    delete where.page;
    delete where.limit;
    return where;
  }
}


module.exports = new PeopleService();
