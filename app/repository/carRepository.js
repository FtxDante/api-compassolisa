/* eslint-disable require-jsdoc */
const CarSchema = require('../schema/carSchema');

class CarRepository {
  async create(carData) {
    return await CarSchema.create(carData);
  }

  async deleteOne(id) {
    return await CarSchema.findByIdAndRemove(id);
  }

  async updateOneCar(req, res) {
    // eslint-disable-next-line new-cap
    const where = {id: req.id};
    const update = req.body;
    await CarSchema.updateOne(where, update);
  }

  async create(carData) {
    return await CarSchema.create(carData);
  }

  async findAll(where = {}, page = null, limit = null) {
    return await CarSchema.find(where)
        .skip(page * limit)
        .limit(limit);
  }

  async pagination(req, where = {}) {
    try {
      let {page = 0, limit = 100} = req.query;

      if (page > 0) page -= 1;

      const data = await this.findAll(where, Number(page), Number(limit));

      const dataTotal = await this.findAll(where);

      const paginationFormated = {
        veiculos: data,
        total: dataTotal.length,
        limit: Number(limit),
        offset: page + 1,
        offsets: Math.ceil(dataTotal.length/limit),
      };

      return paginationFormated;
    } catch (error) {
      return error;
    };
  };
};
module.exports = new CarRepository();
