const peopleService = require('../service/peopleService');

class PeopleController {
  static async createPeople(req, res) {
    const result = await peopleService.createPeople(req.body);
    return res.status(201).json(result);
  }
  static async getAllPeople(req, res) {
    const result = await peopleService.findAll(req, res);
    return res.status(201).json(result);
  }

  static async deleteOne(req, res) {
    const id = req.params.id;

    try {
      const result = await peopleService.deleteOne(id);

      if (result instanceof Error) {
        throw error;
      }

      return res.status(204).end();
    } catch (error) {
      return res.status(404).end();
    }
  }
}

module.exports = PeopleController;
