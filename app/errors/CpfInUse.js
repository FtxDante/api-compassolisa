class CpfInUse extends Error {
    constructor(cpf) {
      super(`CPF ${cpf} already in use`);
      this.name = 'CpfRegistered';
      this.idError = '005';
    }
  }
  module.exports = CpfInUse;
  