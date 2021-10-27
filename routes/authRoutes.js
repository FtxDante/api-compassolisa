const AuthController = require('../app/controllers/authController');

const {
  AuthDataValidation} = require('../app/validation/auth');

module.exports = (server, routes, prefix = '/api/v1') => {
  routes.post('/authenticate', AuthDataValidation,
      AuthController.authenticate);

  server.use(prefix, routes);
};
