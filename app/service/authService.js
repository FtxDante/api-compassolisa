/* eslint-disable require-jsdoc */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {AuthInvalid} = require('../errors');

const PeopleRepository = require('../repository/peopleRepository');
class AuthService {
  async authenticate(req) {
    const user =await this.verifyCredentials(req.body);
    return await this.generateToken(user);
  }

  async verifyCredentials({email, senha}) {
    const userByEmail = await PeopleRepository.findOne({
      email: email,
    });
    if (!userByEmail || !bcrypt.compareSync( senha, userByEmail.senha)) {
      throw new AuthInvalid();
    }
    return userByEmail;
  }

  async generateToken(user) {
    return jwt.sign(
        {email: user.email, habilitado: user.habilitado}, process.env.SECRET,
        {expiresIn: '10h'});
  }
}
module.exports = new AuthService();
