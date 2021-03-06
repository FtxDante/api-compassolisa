const carController = require('../app/controllers/carController');

const { allRequiredCarValidation, idValidation, patchValidation } = require('../app/validation/car');
const { tokenValidation } = require('../app/validation/auth');

module.exports = (server, routes, prefix = '/api/v1') => {
  routes.post('/car', tokenValidation, allRequiredCarValidation, carController.createCar);
  routes.put('/car/:id', tokenValidation, idValidation, allRequiredCarValidation, carController.updateOneCar);
  routes.get('/car?', tokenValidation, carController.getAllCars);
  routes.get('/car/:id', idValidation, tokenValidation, carController.getOneCar);
  routes.delete('/car/:id', idValidation, tokenValidation, carController.deleteOne);
  routes.patch(
    '/car/:id/acessorios/:idAcess',
    idValidation,
    tokenValidation,
    patchValidation,
    carController.updateAcessory
  );
  server.use(prefix, routes);
};
