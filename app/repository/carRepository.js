const Repository = require('./Repository');

class CarRepository extends Repository {
  constructor() {
    super('CarSchema');
  }

  async formatOfPagination(req) {
    const {data, dataTotal, page, limit} = await this.pagination(req);

    return {
      veiculos: data,
      total: dataTotal.length,
      limit: Number(limit),
      offset: page + 1,
      offsets: Math.ceil(dataTotal.length / limit),
    };
  }
};
module.exports = new CarRepository();

