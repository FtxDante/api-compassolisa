const PeopleRepository = require('../repository/peopleRepository')

class PeopleService{

    async createPeople(peopleData){
        try{
            const {nome, cpf, data_nascimento, email, habilitado} = await PeopleRepository.create(peopleData);

            return {
                nome: nome,
                cpf: cpf,
                data_nascimento: data_nascimento,
                email: email,
                habilitado: habilitado
            };
        }catch(error){
            return error;

        }
    }
    async findAll(req, res){
        try{
           return await PeopleRepository.pagination(req)
        }catch(error){
            return res.status(400).json({message: error.message});
        }
    }
}

module.exports = new PeopleService;