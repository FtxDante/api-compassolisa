const allRequiredCarValidation = require('./allRequired');
const findValidation = require('./find');
const idValidation = require('../__validationsCommons/idValidation');

module.exports = {
  allRequiredCarValidation,
  findCarValidation: findValidation,
  idValidation
};
