const AuthInvalid = require('./AuthInvalid');
const InvalidId = require('./InvalidId');
const NotFound = require('./NotFound');
const CpfInUse = require('./CpfInUse');
const EmailInUse = require('./EmailInUse');
const CnpjInUse = require('./CnpjInUse');
const errosName = require('./errosName.json');
const HandleErrors = require('./HandleErrors');

module.exports = {
  AuthInvalid,
  InvalidId,
  NotFound,
  CpfInUse,
  EmailInUse,
  CnpjInUse,
  errosName,
  handleErrors: HandleErrors
};
