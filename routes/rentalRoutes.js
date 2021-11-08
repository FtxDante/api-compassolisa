const rentalController = require('../app/controllers/rentalController');
const { allRequired } = require('../app/validation/rental');

module.exports = (server, routes, prefix = '/api/v1') => {
  routes.get('/rental', allRequired, rentalController.teste);
  server.use(prefix, routes);
};
