const rentalController = require('../app/controllers/rentalController');
const { IdValidation } = require('../app/validation/rental');

module.exports = (server, routes, prefix = '/api/v1') => {
  server.use(prefix, routes);
  routes.get('/rental/:id', IdValidation, rentalController.getOneRental);
};
