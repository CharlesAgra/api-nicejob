const express = require('express');
const router = express.Router();

//Model
const User = require('../models/RegisterUser');

router.post('/registration', (req, res) => {
    const saveNewUser = User({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    })

    saveNewUser.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(201).send({error: error})
        })
});

module.exports = router;