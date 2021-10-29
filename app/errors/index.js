const AuthInvalid = require('./AuthInvalid');
const InvalidId = require('./InvalidId');
const NotFound = require('./NotFound');
const UserRegistered = require('./UserRegistered');
const errosName = require('./errosName.json');
const HandleErrors = require('./HandlerErrors');

module.exports = {
  AuthInvalid: AuthInvalid,
  InvalidId: InvalidId,
  NotFound: NotFound,
  UserRegistered: UserRegistered,
  errosName: errosName,
  HandleErrors: HandleErrors,
};
