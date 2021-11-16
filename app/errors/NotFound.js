class NotFound extends Error {
  constructor(item) {
    super();

    this.description = 'NotFound';
    this.name = `${item} not found`;
  }
}
module.exports = NotFound;
