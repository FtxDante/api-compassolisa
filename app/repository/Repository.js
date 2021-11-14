class Repository {
  constructor(schema) {
    this.schema = schema;
  }

  async create(data) {
    const create = await this.schema.create(data);
    return create;
  }

  async deleteOne(id) {
    const deleteOne = await this.schema.findByIdAndRemove(id);
    return deleteOne;
  }

  async updateOne(req, where = { _id: req.params.id }, getNew = { new: true }) {
    const update = req.body;
    const updateOne = await this.schema.findOneAndUpdate(where, update, getNew);
    return updateOne;
  }

  async findOne(where) {
    const findOne = await this.schema.findOne(where);
    return findOne;
  }

  async findById(id) {
    const findById = await this.schema.findById(id);
    return findById;
  }

  async pagination(req, where = {}) {
    // eslint-disable-next-line prefer-const
    let { page = 0, limit = 100 } = req.query;

    if (page > 0) page -= 1;
    const data = await this.schema.paginate(where, { page, limit });
    return data;
  }
}

module.exports = Repository;
