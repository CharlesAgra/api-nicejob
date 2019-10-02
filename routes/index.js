const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

//Model
const User = require('../models/RegisterUser');

router.post('/registration', async (req, res) => {
    //Mudando a senha para hash
    const salt = await bcrypt.genSalt(10);
    const hashSenha = await bcrypt.hash(req.body.senha, salt);

    //Verificar se o email ja existe
    const user = await User.findOne({ email: req.body.email });

    if(user)
        return res.status(400).send({ error: 'Usuário já existe'});

    const saveNewUser = User({
        nome: req.body.nome,
        email: req.body.email,
        senha: hashSenha
    })

    saveNewUser.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(201).send({error: error})
        })
});

router.post('/authenticate', async (req, res) =>{
    const email = req.body.email;
    const senha = req.body.senha;

    //Checando se usuário existe
    const user = await User.findOne({ email: req.body.email });

    if(!user)
        return res.status(400).send({ error: 'Usuário não encontrado'});

    // Chegando se a senha é igual
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if(!senhaValida)
        res.status(201).send({error: "Senha inválida"});

    //Usando jsonwebtoken -> criando e assinando um token
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);
    res.header('Authorization', token).status(200).send({id: user._id, message: "Logged in"});
});

router.get('/', (req, res) =>{
    res.send("Hello World!!");
});

module.exports = router;