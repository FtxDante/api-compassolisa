/* eslint-disable require-jsdoc */
const PeopleRepository = require('../repository/peopleRepository');


class AuthService {
  async findUser(req, res) {
    try {
      return await PeopleRepository.findOne(req);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  }
}

module.exports = new AuthService();
