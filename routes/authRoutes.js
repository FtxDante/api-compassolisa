const AuthController = require('../app/controllers/authController');

const {
  authDataValidation} = require('../app/validation/auth');

module.exports = (server, routes, prefix = '/api/v1') => {
  routes.post('/authenticate', authDataValidation,
      AuthController.authenticate);

  server.use(prefix, routes);
};
