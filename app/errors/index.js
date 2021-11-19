const AuthInvalid = require('./AuthInvalid');
const InvalidToken = require('./InvalidToken');
const NotFound = require('./NotFound');
const CpfInUse = require('./CpfInUse');
const EmailInUse = require('./EmailInUse');
const CnpjInUse = require('./CnpjInUse');
const errosName = require('./errosName.json');
const HandleErrors = require('./HandleErrors');

module.exports = {
  AuthInvalid,
  NotFound,
  CpfInUse,
  EmailInUse,
  CnpjInUse,
  InvalidToken,
  errosName,
  handleErrors: HandleErrors
};
