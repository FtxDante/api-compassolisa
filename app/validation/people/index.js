const CreateValidation = require('./create');
const DeletePeopleValidation = require('./deleteOne');
const AllRequiredValidation = require('./allRequired');

module.exports = {
  CreatePeopleValidation: CreateValidation,
  DeletePeopleValidation: DeletePeopleValidation,
  AllRequiredValidation: AllRequiredValidation,
};
