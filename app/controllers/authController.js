/* eslint-disable require-jsdoc */
const AuthService = require('../service/authService');
class AuthController {
  static async authenticate(req, res) {
    const user = await AuthService.findUser(req, res);
    return res.status(201).json(user);
  }
}

module.exports = AuthController;
