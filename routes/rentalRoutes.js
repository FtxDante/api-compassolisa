const rentalController = require('../app/controllers/rentalController');

module.exports = (server, routes, prefix = '/api/v1') => {
  routes.post('/rental', rentalController.createRental);
  server.use(prefix, routes);
};
