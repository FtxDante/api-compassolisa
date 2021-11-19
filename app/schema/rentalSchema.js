/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
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
  for (let i = 0; i < this.endereco.length; i++) {
    const { logradouro, bairro, localidade, uf } = await getCepData.getData(this.endereco[i].cep);
    this.endereco[i].logradouro = logradouro;
    this.endereco[i].bairro = bairro;
    this.endereco[i].localidade = localidade;
    this.endereco[i].uf = uf;
  }

  return next();
});

RentalSchema.pre('findOneAndUpdate', async function getExternalData(next) {
  const data = this.getUpdate();
  for (let i = 0; i < data.endereco.length; i++) {
    const { logradouro, bairro, localidade, uf } = await getCepData.getData(data.endereco[i].cep);
    data.endereco[i].logradouro = logradouro;
    data.endereco[i].bairro = bairro;
    data.endereco[i].localidade = localidade;
    data.endereco[i].uf = uf;
  }

  return next();
});
RentalSchema.plugin(mongoosePaginate);
const Rental = mongoose.model('Rental', RentalSchema);

module.exports = Rental;
