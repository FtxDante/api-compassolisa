const peopleSerializer = ({ _id, nome, cpf, data_nascimento, email, habilitado }) => ({
  _id,
  nome,
  cpf,
  data_nascimento,
  email,
  habilitado
});

const peoplePaginateSerializer = ({ docs, totalDocs, limit, pagingCounter, totalPages }) => ({
  people: docs.map(peopleSerializer),
  total: totalDocs,
  limit,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { peopleSerializer, peoplePaginateSerializer };
