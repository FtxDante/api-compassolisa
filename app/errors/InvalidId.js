class InvalidId extends Error {
  constructor() {
    super('Invalid ID');
    this.name = 'InvalidId';
    this.idError = '001';
    this.errorStatus = 400;
  }
};
module.exports = InvalidId;
