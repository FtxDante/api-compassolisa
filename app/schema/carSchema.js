const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// eslint-disable-next-line new-cap
const carSchema = mongoose.Schema(
  {
    modelo: {
      type: String,
      required: true
    },
    cor: {
      type: String,
      required: true
    },
    ano: {
      type: Number,
      required: true,
      min: 1950,
      max: 2022
    },
    acessorios: [
      {
        descricao: {
          type: String,
          required: true
        }
      }
    ],
    quantidadePassageiros: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { collection: 'cars' }
);

carSchema.plugin(mongoosePaginate);
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
