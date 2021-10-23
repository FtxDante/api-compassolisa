const allRequiredCarValidation = require('./allRequired');
const findValidation = require('./find');
const deleteOne = require('./deleteOne')

module.exports = {
    allRequiredCarValidation: allRequiredCarValidation,
    findCarValidation: findValidation,
    deleteCarValidation: deleteOne
}