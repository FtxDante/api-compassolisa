const carController = require('../app/controllers/carController');
const createCarValidation = require('../app/validation/car/create');
const deleteCarValidation = require('../app/validation/car/deleteOne');

module.exports = (server, routes, prefix = '/api/v1') =>{
  routes.post('/car', createCarValidation, carController.createCar);
  routes.delete('/car/:id', deleteCarValidation, carController.deleteOne);

  server.use(prefix, routes);
};
