const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// eslint-disable-next-line new-cap
const rentalSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    cnpj: {
      type: String,
      required: true
    },
    atividades: {
      type: String,
      required: true
    },
    endereco: {
      type: [Object],
      required: true
    }
  },
  { collection: 'rental' }
);

rentalSchema.plugin(mongoosePaginate);
const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
