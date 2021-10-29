class NotFound extends Error {
  constructor(item) {
    const msg = `${item} not found`;
    super(msg);
    this.name = 'NotFound';
    this.idError = '002';
    this.errorStatus = 404;
  }
};

module.exports = NotFound;
