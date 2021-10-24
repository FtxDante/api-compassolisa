const carController = require('../app/controllers/carController');

const {allRequiredCarValidation, findCarValidation,
  deleteCarValidation} = require('../app/validation/car');

module.exports = (server, routes, prefix = '/api/v1') =>{
  routes.post('/car', allRequiredCarValidation, carController.createCar);
  routes.put('/car/:id', allRequiredCarValidation, carController.updateOneCar);
  routes.get('/car?', findCarValidation, carController.getAllCars);
  routes.delete('/car/:id', deleteCarValidation, carController.deleteOne);

  server.use(prefix, routes);
};
