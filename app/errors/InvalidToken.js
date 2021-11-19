class InvalidToken extends Error {
  constructor() {
    super();
    this.description = 'Forbidden';
    this.name = `Invalid Token`;
  }
}
module.exports = InvalidToken;
