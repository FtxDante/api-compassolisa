const PeopleController = require('../app/controllers/peopleController');

module.exports = (server, routes, prefix = '/api/v1') =>{
     routes.post('/people', PeopleController.createPeople);


    server.use(prefix, routes);
}