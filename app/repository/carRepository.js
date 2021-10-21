const CarSchema = require('../schema/carSchema');

class CarRepository {
    async create(carData) {

        return await CarSchema.create(carData);
    }

    async find(where = {}, page = null, limit = null,){

        return await CarSchema.find(where)
            .skip(page * limit)
            .limit(limit);
    }

    async pagination(req, where = {}){
        try{
            let { page = 0, limit = 100} = req.query;

            if(page > 0) page -= 1;

            const data = await this.find(where, Number(page), Number(limit));
            const dataTotal = await this.find(where);

            const paginationFormated = {
                veiculos: data,
                total: dataTotal.length,
                limit: Number(limit),
                offset: page + 1,
                offsets: Math.ceil(dataTotal.length/limit)
            }
            return paginationFormated;
        }catch(error){
            return error;
        }
        
    }
}

module.exports = new CarRepository();