class UserRegistered extends Error {
  constructor() {
    super('user already registered');
    this.name = 'UserRegistered';
    this.idError = '003';
  }
};
module.exports = UserRegistered;
