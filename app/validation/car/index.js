const allRequiredCarValidation = require('./allRequired');

const findCarValidation = require('./find');
const idValidation = require('../__validationsCommons/idValidation');
const pathValidation = require('./path');

module.exports = {
  allRequiredCarValidation,
  findCarValidation,
  idValidation,
  pathValidation
};
