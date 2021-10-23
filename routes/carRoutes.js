const carController = require('../app/controllers/carController');

const { createCarValidation, findCarValidation } = require('../app/validation/car');

module.exports = (server, routes, prefix = '/api/v1') =>{
    routes.post('/car', createCarValidation, carController.createCar);
    routes.put('/car/:id', createCarValidation, carController.updateOneCar);
    routes.get('/car?', findCarValidation , carController.getAllCars);
    routes.delete('/car/:id', deleteCarValidation, carController.deleteOne);
  

  server.use(prefix, routes);
};
