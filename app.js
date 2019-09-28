const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({message: "Hello World"});
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
