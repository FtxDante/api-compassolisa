const { CarSchema } = require('../schema');
const Repository = require('./Repository');

class CarRepository extends Repository {
  constructor() {
    super(CarSchema);
  }

  async formatOfPagination(req, where = {}) {
    const { data, dataTotal, page, limit } = await this.pagination(req, where);

    return {
      veiculos: data,
      total: dataTotal.length,
      limit: Number(limit),
      offset: page + 1,
      offsets: Math.ceil(dataTotal.length / limit)
    };
  }
}
module.exports = new CarRepository();
