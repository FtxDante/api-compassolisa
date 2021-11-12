const carController = require('../app/controllers/carController');

const { allRequiredCarValidation, findCarValidation, idValidation, pathValidation } = require('../app/validation/car');

module.exports = (server, routes, prefix = '/api/v1') => {
  routes.post('/car', allRequiredCarValidation, carController.createCar);
  routes.put('/car/:id', idValidation, allRequiredCarValidation, carController.updateOneCar);
  routes.get('/car?', findCarValidation, carController.getAllCars);
  routes.get('/car/:id', idValidation, carController.getOneCar);
  routes.delete('/car/:id', idValidation, carController.deleteOne);
  routes.patch('/car/:id/acessorios/:idAcess', idValidation, pathValidation, carController.updateAcessory);

  server.use(prefix, routes);
};
