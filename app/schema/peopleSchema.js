const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcryptjs');

// eslint-disable-next-line new-cap
const peopleSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },

    cpf: {
      type: String,
      required: true
    },

    data_nascimento: {
      type: Date,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    senha: {
      type: String,
      required: true,
      minLength: 6
    },
    habilitado: {
      type: String,
      enum: ['sim', 'nao'],
      required: true
    }
  },
  { collection: 'people' }
);

peopleSchema.pre('save', async function preSave(next) {
  if (!this.isModified('senha')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  return next();
});

peopleSchema.pre('findOneAndUpdate', async function preUpdate(next) {
  const data = this.getUpdate();
  if (data.senha) {
    const salt = await bcrypt.genSalt(10);
    data.senha = await bcrypt.hash(data.senha, salt);
  }
  return next();
});

peopleSchema.plugin(mongoosePaginate);
const People = mongoose.model('People', peopleSchema);

module.exports = People;
