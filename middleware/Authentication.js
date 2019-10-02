const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const token = req.header('Authorization');

    if(!token)
        return res.status(401).send({message: 'Acesso negado'});

    try{
        const verify = jwt.verify(token, process.env.TOKEN_SECRET);
        //toda vez que usarmos req.user vai estar o token.
        //Ou seja toda pagina que tiver o nosso middleware terá o token
        req.user = verify;
        next();
    }catch(error){
        res.status(201).send({message: 'Token inválido'});
    }
}

module.exports = verifyToken;