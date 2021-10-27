/* eslint-disable require-jsdoc */
require('dotenv').config();
const jwt = require('jsonwebtoken');

const PeopleRepository = require('../repository/peopleRepository');

class AuthService {
  async findUser(req, res) {
    try {
      const user =await PeopleRepository.findOne(req);
      return await this.generateToken(user);
      // const token =await this.generateToken(user);

      // return {
      //   token: token,
      //   email: user.email,
      //   habilitado: user.habilitado,
      // };
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  }

  async generateToken(user) {
    try {
      return jwt.sign(
          {email: user.email, habilitado: user.habilitado}, process.env.SECRET,
          {expiresIn: '10h'});
    } catch (error) {
      return error;
    }
  }
}
module.exports = new AuthService();
