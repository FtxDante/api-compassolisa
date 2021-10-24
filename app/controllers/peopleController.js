const peopleService = require("../service/peopleService");

class PeopleController {
  static async createPeople(req, res) {
    const result = await peopleService.createPeople(req.body);
    return res.status(201).json(result);
  }
  static async getAllPeople(req, res) {
    const result = await peopleService.findAll(req, res);
    return res.status(201).json(result);
  }
}

module.exports = PeopleController;
