const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    servico: {
        type: String,
        required: true,
    },
    local: {
        type: String,
        required: true,
    },
    quantidadeAreas: {
        type: String,
        required: true,
    },
    descricao:{
        type: String,
        require: true,
    },
    cep:{
        type: String,
        require: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', UserSchema);