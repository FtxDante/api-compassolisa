class AuthInvalid extends Error {
  constructor(input) {
    super();
    this.description = 'Unauthorized';
    this.name = `${input}  invalid`;
  }
}
module.exports = AuthInvalid;
