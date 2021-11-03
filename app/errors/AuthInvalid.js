class AuthInvalid extends Error {
  constructor() {
    super('email or password invalid');
    this.name = 'AuthInvalid';
    this.idError = '004';
  }
}
module.exports = AuthInvalid;
