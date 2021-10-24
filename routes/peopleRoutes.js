const PeopleController = require('../app/controllers/peopleController');
const {CreatePeopleValidation,FindPeopleValidation} = require('../app/validation/people')

module.exports = (server, routes, prefix = '/api/v1') =>{
     routes.post('/people', CreatePeopleValidation, PeopleController.createPeople);
     routes.get('/people?', FindPeopleValidation, PeopleController.findAllPeople);


    server.use(prefix, routes);
}