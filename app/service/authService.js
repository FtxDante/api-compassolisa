/* eslint-disable require-jsdoc */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const PeopleRepository = require('../repository/peopleRepository');

class AuthService {
  async authenticate(req) {
    try {
      const user = await this.verifyCredentials(req.body);
      return await this.generateToken(user);
    } catch (error) {
      throw error;
    }
  }

  async verifyCredentials({ email, senha }) {
    const userByEmail = await PeopleRepository.findOne({
      email
    });
    if (!userByEmail || !bcrypt.compareSync(senha, userByEmail.senha)) {
      throw new Error('Email or password is invalid');
    }
    return userByEmail;
  }

  async generateToken(user) {
    try {
      return jwt.sign({ email: user.email, habilitado: user.habilitado }, process.env.SECRET, { expiresIn: '10h' });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new AuthService();
