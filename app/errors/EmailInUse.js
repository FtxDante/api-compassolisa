class EmailInUse extends Error {
  constructor(email) {
    super(`Email ${email} already in use`);
    this.name = 'EmailRegistered';
    this.idError = '003';
  }
}
module.exports = EmailInUse;
