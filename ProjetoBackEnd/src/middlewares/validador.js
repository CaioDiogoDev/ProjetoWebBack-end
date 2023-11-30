const { response } = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json()); 

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
    if(!body.nome || !body.password){
       return res.status(400).json({message: 'Necessario informar nome  e password'})
    }
    next();
}

const verificaCadastroUsuario = (req, res, next) => {
    const {body} = req;
    if(!body.nome && !body.password && !body.telefone ){
        return res.status(400).json({message: 'Necessario informar todos os dados para cadastro de usuarios'})
     }
     next();
}


const verificaCadastroAdmin = (req, res, next) => {
    const {body} = req;
    if(!body.nome && !body.password && !body.telefone && !body.tipUsuario){
        return res.status(400).json({message: 'Necessario todos os dados para cadastro de novos administradores'})
     }
     next();
}

const verificaDeleteUsuario = (req, res, next) => {
    const {body} = req;
    if(!body.nome && !body.password && !body.telefone){
        return res.status(400).json({message: 'Necessario todos os dados para localizar usuario a ser excluido.'})
     }
     next();
}

const verificaUpdateUsuario = (req, res, next) => {
    const {body} = req;
    if(!body.nome && !body.telefone && !body.tipUsuario){
        return res.status(400).json({message: 'Necessario informar esses dados para atualiazar dados.'})
     }
     next();
}

const verificaDeleteProntuario = (req, res, next) => {
    const {body} = req;
    if(!body.paciente && !body.dataregistro){
        return res.status(400).json({message: 'Necessario informar esses dados para remover prontuario.'})
     }
     next();
    
}

module.exports = {
    validaTexto, 
    validarCampoNumerico,
    verificaToken,
    verificaBodyLogin,
    verificaCadastroUsuario,
    verificaCadastroAdmin,
    verificaDeleteUsuario,
    verificaUpdateUsuario,
    verificaDeleteProntuario
    
}