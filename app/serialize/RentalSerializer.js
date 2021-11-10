const rentalSerializer = ({ _id, nome, cnpj, atividades, endereco }) => ({
  _id,
  nome,
  cnpj,
  atividades,
  endereco
});

const rentalPaginateSerializer = ({ docs, totalDocs, limit, pagingCounter, totalPages }) => ({
  locadoras: docs.map(rentalSerializer),
  total: totalDocs,
  limit,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { rentalSerializer, rentalPaginateSerializer };
