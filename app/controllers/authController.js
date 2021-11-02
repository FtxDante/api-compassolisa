const {handleErrors} = require('../errors');
/* eslint-disable require-jsdoc */
const AuthService = require('../service/authService');
class AuthController {
  static async signIn(req, res) {
    try {
      const token = await AuthService.authenticate(req);
      res.header('Access-Control-Expose-Headers', token);

      return res.status(200).end();
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json({message: error.message});
    }
  }
}

module.exports = AuthController;
