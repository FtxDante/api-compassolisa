const PeopleController = require('../app/controllers/peopleController');
const {AllRequireValidation, IdValidation} =
require('../app/validation/people');

module.exports = (server, routes, prefix = '/api/v1') =>{
  routes.post('/people', AllRequireValidation, PeopleController.createPeople);
  routes.get('/people?', PeopleController.getAllPeople);
  routes.put('/people/:id', IdValidation,
      AllRequireValidation,
      PeopleController.updateOnePerson);
  server.use(prefix, routes);
};
