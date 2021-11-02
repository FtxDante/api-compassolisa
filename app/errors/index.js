const AuthInvalid = require('./AuthInvalid');
const InvalidId = require('./InvalidId');
const NotFound = require('./NotFound');
const UserRegistered = require('./UserRegistered');
const errosName = require('./errosName.json');
const HandleErrors = require('./HandleErrors');

module.exports = {
  AuthInvalid: AuthInvalid,
  InvalidId: InvalidId,
  NotFound: NotFound,
  UserRegistered: UserRegistered,
  errosName: errosName,
  handleErrors: HandleErrors,
};
