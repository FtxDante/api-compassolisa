const carSerializer = ({ _id, modelo, cor, ano, acessorios, quantidadePassageiros }) => ({
  _id,
  modelo,
  cor,
  ano,
  acessorios,
  quantidadePassageiros
});

const carPaginateSerializer = ({ docs, totalDocs, limit, pagingCounter, totalPages }) => ({
  cars: docs.map(carSerializer),
  total: totalDocs,
  limit,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { carSerializer, carPaginateSerializer };
