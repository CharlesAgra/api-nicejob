const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

//Rotas
const database = require('./database/connection');

//Rotas
const indexRouter = require('./routes/index');
const catalogoRouter = require('./routes/catalogo');

const app = express();
const PORT = 9000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use('/', indexRouter);
app.use('/registration', indexRouter);
app.use('/afterlogin', catalogoRouter);

app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
