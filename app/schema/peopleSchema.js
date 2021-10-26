const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// eslint-disable-next-line new-cap
const peopleSchema = mongoose.Schema({

  nome: {
    type: String,
    required: true,
  },

  cpf: {
    type: Number,
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

// eslint-disable-next-line arrow-parens
peopleSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;
