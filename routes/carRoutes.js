const carController = require('../app/controllers/carController');
const createCarValidation = require('../app/validation/car/create');

module.exports = (server, routes, prefix = '/api/v1') =>{
  routes.post('/car', createCarValidation, carController.createCar);
  routes.put('/car/:id', createCarValidation, carController.updateById);

  server.use(prefix, routes);
};
