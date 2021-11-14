/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const getCepData = require('../../infra/database/axios/getCepData');

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
          complemento: { type: String },
          logradouro: { type: String },
          bairro: { type: String },
          localidade: { type: String },
          uf: { type: String }
        }
      ],
      required: true
    }
  },
  { collection: 'rentals' }
);

RentalSchema.pre('save', async function getExternalData(next) {
  if (!this.isModified('endereco.cep')) {
    return next();
  }
  for (let i = 0; i < this.endereco.length; i++) {
    const { logradouro, bairro, localidade, uf } = await getCepData.getData(this.endereco[i].cep);
    this.endereco[i].logradouro = logradouro;
    this.endereco[i].bairro = bairro;
    this.endereco[i].localidade = localidade;
    this.endereco[i].uf = uf;
  }

  return next();
});

const Rental = mongoose.model('Rental', RentalSchema);

module.exports = Rental;
