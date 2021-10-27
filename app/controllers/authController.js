/* eslint-disable require-jsdoc */
const AuthService = require('../service/authService');
class AuthController {
  static async authenticate(req, res) {
    const result = await AuthService.findUser(req, res);
    return res.status(201).json(result);
  }
}

module.exports = AuthController;
