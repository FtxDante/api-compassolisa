const allRequiredCarValidation = require('./allRequired');
const findValidation = require('./find');
const idValidation = require('./idValidation');

module.exports = {
  allRequiredCarValidation,
  findCarValidation: findValidation,
  idValidation
};
