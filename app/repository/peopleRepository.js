const { PeopleSchema } = require('../schema');
const Repository = require('./Repository');

class PeopleRepository extends Repository {
  constructor() {
    super(PeopleSchema);
  }
}
module.exports = new PeopleRepository();
