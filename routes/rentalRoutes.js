const rentalController = require('../app/controllers/rentalController');
const { AllRequiredValidation } = require('../app/validation/rental');

module.exports = (server, routes, prefix = '/api/v1') => {
  routes.post('/rental', AllRequiredValidation, rentalController.createRental);
  server.use(prefix, routes);
};
