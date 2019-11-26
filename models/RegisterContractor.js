const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    senha: {
        type: String,
        require: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    telefone:{
        type: String,
        require: true,
    },
    endereco:{
        type: String,
        require: true,
    },
    cidade:{
        type: String,
        require: true,
    },
    cep:{
        type: String,
        require: true,
    },
    especialidades:{
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Contractor', UserSchema);