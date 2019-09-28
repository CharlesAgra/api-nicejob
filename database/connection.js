const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_CONNECTION, () =>{
    useNewUrlParser: true

    console.log("Conectado ao database");
})

module.exports = mongoose;