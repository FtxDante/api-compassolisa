const peopleService = require('../service/peopleService');
const { handleErrors } = require('../errors');

class PeopleController {
  static async createPeople(req, res) {
    try {
      const result = await peopleService.createPeople(req.body, req);
      return res.status(201).json(result);
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json(error);
    }
  }

  static async getAllPeople(req, res) {
    try {
      const result = await peopleService.findAll(req, res);
      return res.status(200).json(result);
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }

  static async getOnePerson(req, res) {
    try {
      const { id } = req.params;
      const result = await peopleService.findById(id);
      return res.status(200).json(result);
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }

  static async updateOnePerson(req, res) {
    try {
      const result = await peopleService.updateOnePerson(req);
      return res.status(200).json(result);
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }

  static async deleteOne(req, res) {
    const { id } = req.params;

    try {
      await peopleService.deleteOne(id);

      return res.status(204).end();
    } catch (error) {
      const status = handleErrors.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }
}

module.exports = PeopleController;
