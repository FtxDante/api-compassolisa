const rentalController = require('../app/controllers/rentalController');
const { IdValidation } = require('../app/validation/rental');

module.exports = (server, routes, prefix = '/api/v1') => {
  routes.get('/rental/:id', IdValidation, rentalController.getOneRental);
  routes.put('/rental/:id', IdValidation, AllRequired, rentalController.updateOneRental);
  routes.delete('/rental/:id', IdValidation, rentalController.deleteOneRental);
  server.use(prefix, routes);
  routes.get('/rental/:id', IdValidation, rentalController.getOneRental);
};
