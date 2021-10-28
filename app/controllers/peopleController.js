const peopleService = require('../service/peopleService');

class PeopleController {
  static async createPeople(req, res) {
    try {
      await peopleService.searchUnique(req, res);
      const result = await peopleService.createPeople(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  }
  static async getAllPeople(req, res) {
    const result = await peopleService.findAll(req, res);
    return res.status(201).json(result);
  }

  static async getOnePerson(req, res) {
    try {
      const {id} = req.params;
      const result = await peopleService.findById(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({message: error.message});
    }
  }

  static async updateOnePerson(req, res) {
    try {
      await peopleService.updateOnePerson(req);
      return res.status(201).end();
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
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
