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

}

module.exports = new PeopleService;