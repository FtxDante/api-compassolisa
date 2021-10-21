const carController = require('../app/controllers/carController');
const createCarValidation = require('../app/validation/car/create');

module.exports = (server, routes, prefix = '/api/v1') =>{
    routes.post('/car', createCarValidation , carController.createCar);

    server.use(prefix, routes);
}