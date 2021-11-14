class CnpjInUse extends Error {
  constructor(cnpj) {
    super();
    this.description = 'Conflict';
    this.name = `Cnpj ${cnpj} already in use`;
  }
}
module.exports = CnpjInUse;
