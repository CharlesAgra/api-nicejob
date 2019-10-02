const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//Rotas
const database = require('./database/connection');

//Rotas
const indexRouter = require('./routes/index');
const catalogoRouter = require('./routes/catalogo');

const app = express();
const PORT = 3000;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRouter);
app.use('/registration', indexRouter);
app.use('/afterlogin', catalogoRouter);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
