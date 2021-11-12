const rentalController = require('../app/controllers/rentalController');
const { IdValidation, AllRequireValidation } = require('../app/validation/rental');

module.exports = (server, routes, prefix = '/api/v1') => {
  routes.get('/rental/:id', IdValidation, rentalController.getOneRental);
  routes.put('/rental/:id', IdValidation, rentalController.updateOneRental);

  server.use(prefix, routes);
};
