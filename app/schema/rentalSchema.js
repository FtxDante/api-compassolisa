const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const RentalSchema = mongoose.Schema(
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
  { collection: 'rents' }
);

const Rental = mongoose.model('Rental', RentalSchema);

module.exports = Rental;
