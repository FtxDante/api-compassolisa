const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// eslint-disable-next-line new-cap
const peopleSchema = mongoose.Schema({

  nome: {
    type: String,
    required: true,
  },

  cpf: {
    type: String,
    required: true,
  },

  data_nascimento: {
    type: Date,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  senha: {
    type: String,
    required: true,
    minLength: 6,
  },
  habilitado: {
    type: String,
    enum: ['sim', 'nao'],
    required: true,
  },
});

peopleSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
});

peopleSchema.pre('updateOne', async function(next) {
  const data = this.getUpdate();
  if (data.senha) {
    const salt = await bcrypt.genSalt(10);
    data.senha = await bcrypt.hash(data.senha, salt);
  }
  return next();
});


const People = mongoose.model('People', peopleSchema);

module.exports = People;
