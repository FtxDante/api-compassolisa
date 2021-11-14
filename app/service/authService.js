require('dotenv').config();
/* eslint-disable require-jsdoc */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const PeopleRepository = require('../repository/peopleRepository');
const { AuthInvalid } = require('../errors');

class AuthService {
  async authenticate(req) {
    const user = await this.verifyCredentials(req.body);
    const token = await this.generateToken(user);
    return token;
  }

  async verifyCredentials({ email, senha }) {
    const userByEmail = await PeopleRepository.findOne({
      email
    });
    if (!userByEmail || !bcrypt.compareSync(senha, userByEmail.senha)) {
      throw new AuthInvalid();
    }
    return userByEmail;
  }

  async generateToken(user) {
    return jwt.sign({ email: user.email, habilitado: user.habilitado }, process.env.SECRET, { expiresIn: '10h' });
  }
}
module.exports = new AuthService();
