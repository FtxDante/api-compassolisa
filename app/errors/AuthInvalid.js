class AuthInvalid extends Error {
  constructor() {
    super();
    this.description = 'Unauthorized';
    this.name = `Email or password invalid`;
  }
}
module.exports = AuthInvalid;
