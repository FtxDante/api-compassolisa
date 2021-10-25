const PeopleController = require('../app/controllers/peopleController');
const {CreatePeopleValidation,
  DeletePeopleValidation} = require('../app/validation/people');

module.exports = (server, routes, prefix = '/api/v1') =>{
  routes.post('/people', CreatePeopleValidation, PeopleController.createPeople);
  routes.get('/people?', PeopleController.getAllPeople);
  routes.delete('/people/:id',
      DeletePeopleValidation, PeopleController.deleteOne);


  server.use(prefix, routes);
};
