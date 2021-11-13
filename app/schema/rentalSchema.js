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
          logradouro: { type: String },
          complemento: { type: String },
          bairro: { type: String },
          number: { type: String, required: true },
          localidade: { type: String, required: true },
          uf: { type: String},
          isFilial: { type: Boolean, required: true },
        }
      ],
      required: true
    }
  },
  { collection: 'rental' }
);

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
