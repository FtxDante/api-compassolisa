class InvalidId extends Error {
  constructor() {
    super();
    this.description = 'BadRequest';
    this.name = 'Invalid ID';
  }
}
module.exports = InvalidId;
