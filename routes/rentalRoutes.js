const rentalController = require('../app/controllers/rentalController');
const { IdValidation, allRequired } = require('../app/validation/rental');

module.exports = (server, routes, prefix = '/api/v1') => {
  routes.get('/rental?', rentalController.getRental);
  routes.get('/rental/:id', IdValidation, rentalController.getOneRental);
  routes.post('/rental', allRequired, rentalController.createRental);
  routes.put('/rental/:id', IdValidation, allRequired, rentalController.updateOneRental);
  routes.delete('/rental/:id', IdValidation, rentalController.deleteOneRental);
  server.use(prefix, routes);
};
