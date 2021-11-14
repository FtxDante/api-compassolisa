class CpfInUse extends Error {
  constructor(cpf) {
    super();
    this.description = 'Conflict';
    this.name = `CPF ${cpf} already in use`;
  }
}
module.exports = CpfInUse;
