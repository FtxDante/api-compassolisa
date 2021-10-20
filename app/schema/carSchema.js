const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    modelo: {
        type: String,
        required: true
    },
    cor: {
        type: String,
        required: true
    },
    ano: {
        type: Date,
        required: true,
    },
    acessorios:{
        type: [Object],
        required: true
    },
    quantidadePassageiros: {
        type: Number,
        required: true,
        min: 1
    }
})

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;