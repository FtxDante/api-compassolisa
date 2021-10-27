const Schemas = require('../schema');

class Repository {
  constructor(schema) {
    this.schema = schema;
  }

  async create(data) {
    return await Schemas[this.schema].create(data);
  }

  async deleteOne(id) {
    return await Schemas[this.schema].findByIdAndRemove(id);
  }

  async updateOne(req, where = {_id: req.params.id}) {
    const update = req.body;
    await Schemas[this.schema].updateOne(where, update);
  }

  async findAll(where = {}, page = null, limit = null) {
    return await Schemas[this.schema]
        .find(where)
        .skip(page * limit)
        .limit(limit);
  }

  async findOne(where) {
    return await Schemas[this.schema]
        .findOne(where);
  }
  createWhere(params) {
    try {
      const paramsQuery ={...params};
      delete paramsQuery.id;
      delete paramsQuery.page;
      delete paramsQuery.limit;
      return paramsQuery;
    } catch (error) {

    }
  }
  async pagination(req, where = {}) {
    try {
      let {page = 0, limit = 100} = req.query;

      if (page > 0) page -= 1;

      const data = await this.findAll(where, Number(page), Number(limit));

      const dataTotal = await this.findAll(where);
      return {data, dataTotal, page, limit};
    } catch (error) {
      return error;
    }
  }
};

module.exports = Repository;
