const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () =>{
    console.log("Conectado ao database");
})

module.exports = mongoose;