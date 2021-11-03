const allRequiredCarValidation = require('./allRequired');
const findValidation = require('./find');
const idValidation = require('./idValidation');
const patch = require('./patch');

module.exports = {
  allRequiredCarValidation: allRequiredCarValidation,
  findCarValidation: findValidation,
  idValidation: idValidation,
  patch: patch,
};
