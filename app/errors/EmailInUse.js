class EmailInUse extends Error {
  constructor(email) {
    super();
    this.description = 'Conflict';
    this.name = `Email ${email} already in use`;
  }
}
module.exports = EmailInUse;
