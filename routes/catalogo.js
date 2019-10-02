const express = require('express');
const verifyToken = require('../middleware/Authentication');
const router = express.Router();

router.get('/', verifyToken, (req, res) =>{
    res.json({catalogo: {nomejob: "encanador", data: "30/09/2019", preco: "50"}});
});

module.exports = router;