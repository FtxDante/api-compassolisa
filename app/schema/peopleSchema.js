const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({

    nome: {
        type: String,
        required: true
    },

    cpf: {
        type: String,
        required: true
    },

    data_nascimento:{
        type: Date,
        required: true    
    },

    email:{
        type: String,
        required: true
    },

    senha:{
        type: String,
        required: true,
        minLength: 6
    },
    habilitado:{
        type:String,
        enum: ['sim', 'nao'],
        required: true
    }
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;