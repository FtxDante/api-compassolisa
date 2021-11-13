const mongoose = require('mongoose');

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
      type: [
        {
          cep: { type: String, required: true },
          number: { type: String, required: true },
          isFilial: { type: Boolean, required: true },
          complemento: { type: String }
        }
      ],
      required: true
    }
  },
  { collection: 'rental' }
);

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
