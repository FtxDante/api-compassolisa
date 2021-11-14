const rentalSerializer = ({ id, nome, cnpj, atividades, endereco }) => ({
  id,
  nome,
  cnpj,
  atividades,
  endereco
});

const rentalPaginateSerializer = ({ docs, totalDocs, limit, pagingCounter, totalPages }) => ({
  rental: docs.map(rentalSerializer),
  total: totalDocs,
  limit,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { rentalSerializer, rentalPaginateSerializer };
