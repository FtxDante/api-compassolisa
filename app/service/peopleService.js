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
}

module.exports = new PeopleService();
