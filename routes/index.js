const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

//Model
const Hired = require('../models/RegisterHired');
const Contractor = require('../models/RegisterContractor');
const Order = require('../models/RegisterOrder');

//Registro do contratado

router.post('/registerHired', async (req, res) => {
    //Mudando a senha para hash
    const salt = await bcrypt.genSalt(10);
    const hashSenha = await bcrypt.hash(req.body.senha, salt);

    //Verificar se o email ja existe
    const hired = await Hired.findOne({ email: req.body.email });

    if(hired)
        return res.status(201).send(hired);

    const saveNewHired = Hired({
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
        senha: hashSenha
    })

    saveNewHired.save()
        .then(data => {
            return res.status(200).send(data);
        })
        .catch(error => {
            return res.status(201).redirect(error);
        })
});

router.post('/authenticate', async (req, res) =>{
    const email = req.body.email;
    const senha = req.body.senha;

    const hired = await Hired.findOne({ email: email });
    const contractor = await Contractor.findOne({ email: email });

    if(!hired && !contractor)
        return res.status(201).send('Usuário não encontrado');

    let hiredOrContractor = hired == null ? "contractor" : "hired";

    let senhaValida = '';

    if(hiredOrContractor === 'hired')
        senhaValida = await bcrypt.compare(senha, hired.senha);
    else
        senhaValida = await bcrypt.compare(senha, contractor.senha);

    if(!senhaValida)
        return res.status(201).send('Senha inválida');

    let token = '';

    let dados = '';

    if(hiredOrContractor === 'hired'){
        token = jwt.sign({_id: hired.id}, process.env.TOKEN_SECRET);
        dados = hired.id;
    }else{
        token = jwt.sign({_id: contractor.id}, process.env.TOKEN_SECRET);
        dados = contractor.id;
    }
    return res.header('Authorization', token).status(200).send({ message: "Logged in", id: dados});
});

// Registro do contratante

router.post('/registerContractor', async (req, res) =>{
    //Mudando a senha para hash
    const salt = await bcrypt.genSalt(10);
    const hashSenha = await bcrypt.hash(req.body.senha, salt);

    //Verificar se o email ja existe
    const contractor = await Contractor.findOne({ email: req.body.email });

    if(contractor)
        return res.status(201).send(contractor);

    console.log(req.body);

    const saveNewContractor = Contractor({
        nome: req.body.nome,
        email: req.body.email,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
        cidade: req.body.cidade,
        especialidades: req.body.especialidades,
        cep: req.body.cep,
        senha: hashSenha
    })

    saveNewContractor.save()
        .then(data => {
            return res.status(200).send(data);
        })
        .catch(error => {
            return res.status(201).redirect(error);
        })
});

//Registro do serviço

router.post('/registerOrder', async (req, res) =>{

});

router.get('/', (req, res) =>{
    res.send("Hello World!!");
});

module.exports = router;