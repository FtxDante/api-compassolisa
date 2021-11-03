class Repository {
  constructor(schema) {
    this.schema = schema;
  }

  async create(data) {
    return await this.schema.create(data);
  }

  async deleteOne(id) {
    return await this.schema.findByIdAndRemove(id);
  }

  async updateOne(req, where = { _id: req.params.id }, getNew = { new: true }) {
    const update = req.body;
    return await this.schema.findOneAndUpdate(where, update, getNew);
  }

  async findAll(where = {}, page = null, limit = null) {
    return await this.schema
      .find(where)
      .skip(page * limit)
      .limit(limit);
  }

  async findOne(where) {
    return await this.schema.findOne(where);
  }

  async findById(id) {
    return await this.schema.findById(id);
  }

  async pagination(req, where = {}) {
    try {
      let { page = 0, limit = 100 } = req.query;

      if (page > 0) page -= 1;

      const data = await this.findAll(where, Number(page), Number(limit));

      const dataTotal = await this.findAll(where);
      return { data, dataTotal, page, limit };
    } catch (error) {
      return error;
    }
  }
}

module.exports = Repository;
