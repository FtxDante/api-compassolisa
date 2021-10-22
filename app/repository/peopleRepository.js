const peopleSchema = require('../schema/peopleSchema');

class PeopleRepository{
    async create(peopleData){
        return await peopleSchema.create(peopleData);
    }

}

module.exports = new PeopleRepository;