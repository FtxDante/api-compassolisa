const carController = require('../app/controllers/carController');
const { createCarValidation, findCarValidation } = require('../app/validation/car');

module.exports = (server, routes, prefix = '/api/v1') =>{
    routes.post('/car', createCarValidation , carController.createCar);
    routes.get('/car?', findCarValidation , carController.getAllCars);
    server.use(prefix, routes);
}