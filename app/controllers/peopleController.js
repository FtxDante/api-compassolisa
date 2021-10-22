const peopleService = require('../service/peopleService')

class PeopleController{
    static async createPeople(req, res){
        const result = await peopleService.createPeople(req.body);
        return res.status(201).json(result);
    }

}

module.exports = PeopleController;