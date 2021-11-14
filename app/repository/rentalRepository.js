const { RentalSchema } = require('../schema');
const Repository = require('./Repository');

class RentalRepository extends Repository {
  constructor() {
    super(RentalSchema);
  }

  async formatOfPagination(req, where = {}) {
    const { data, dataTotal, page, limit } = await this.pagination(req, where);

    return {
      locadoras: data,
      total: dataTotal.length,
      limit: Number(limit),
      offset: page + 1,
      offsets: Math.ceil(dataTotal.length / limit)
    };
  }
}
module.exports = new RentalRepository();
