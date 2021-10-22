const PeopleController = require('../app/controllers/peopleController');
const {CreatePeopleValidation} = require('../app/validation/people')

module.exports = (server, routes, prefix = '/api/v1') =>{
     routes.post('/people', CreatePeopleValidation, PeopleController.createPeople);


    server.use(prefix, routes);
}