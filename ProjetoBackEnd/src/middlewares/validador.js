const { response } = require('express');
const jwt = require('jsonwebtoken');

function validaTexto(texto){
    if (!texto || !texto.trim()) {
        console.log("A string está nula ou vazia.");
    } else {
        console.log(`A string "${texto}" é válida.`);
    }
}

function validarCampoNumerico(valor) {
    if (!valor && valor !== 0) {
        console.log("O campo numérico está vazio ou nulo.");
    } else {
        console.log(`O valor numérico é: ${valor}`);
    }
}

function verificaToken(req, res, next){
    const token = req.headers['authorization'];

    if(!token){
        return res.status(403).json({error: 'Token necessario'})
    }
    jwt.verify(jwt, process.env.SECRET, (err, userInfo) => {
        if (err) {
            res.status(403).end();
            return;
        }

        res.json(userInfo);
    });


    req.userId = decode.id
}

const verificaBodyLogin = (req, res, next) =>{
    const  {body} = req;
    if(body.nome !== null && body.nome !== undefined && body.password !== null && body.password !== undefined){
       return response.status(400).json({message: 'Necessario informar nome  e password'})
    }
}


module.exports = {validaTexto, validarCampoNumerico,verificaToken,verificaBodyLogin}