const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const CarSchema = mongoose.Schema(
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
    acessorios: {
      type: [Object],
      required: true
    },
    quantidadePassageiros: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { collection: 'cars' }
);

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
