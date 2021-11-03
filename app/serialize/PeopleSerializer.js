const serializer = ({ _id, nome, cpf, data_nascimento, email, habilitado }) => ({
  _id,
  nome,
  cpf,
  data_nascimento,
  email,
  habilitado
});

const paginateSerializer = ({ docs, totalDocs, limit, pagingCounter, totalPages }) => ({
  people: docs.map(serializer),
  total: totalDocs,
  limit,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { serializer, paginateSerializer };
