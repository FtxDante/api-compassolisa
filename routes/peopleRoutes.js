const PeopleController = require('../app/controllers/peopleController');
const {CreatePeopleValidation} = require('../app/validation/people');

module.exports = (server, routes, prefix = '/api/v1') =>{
  routes.post('/people', CreatePeopleValidation, PeopleController.createPeople);
  routes.get('/people?', PeopleController.getAllPeople);
  routes.put('/people/:id',
      CreatePeopleValidation,
      PeopleController.updateOnePerson);
  server.use(prefix, routes);
};
