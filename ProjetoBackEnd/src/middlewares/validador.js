const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

function validaTexto(texto) {
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

function verificaToken(req, res, next) {
    const token = req.header('Authorization');
    const tokenComBearer = token;

    const tokenSemBearer = tokenComBearer.replace('Bearer ', '').trim();

    if (!tokenSemBearer) {
        return res.status(401).json({ error: 'Operação inválida - Token não fornecido' });
    }

    jwt.verify(tokenSemBearer, process.env.SECRET, (erro, decoded) => {
        if (erro) {
            console.error('Erro ao verificar token:', erro);
            return res.status(401).json({ error: 'Operação inválida - Token inválido' });
        }

        next();
    });
}

const verificaBodyLogin = (req, res, next) => {
    const { body } = req;
    if (!body.nome || !body.password) {
        return res.status(400).json({ message: 'Necessario informar nome  e password' })
    }
    next();
}

const verificaCadastroUsuario = (req, res, next) => {
    const { body } = req;
    if (!body.nome && !body.password && !body.telefone) {
        return res.status(400).json({ message: 'Necessario informar nome, senha, telefone.' })
    }
    next();
}

const verificaCadastroAdmin = (req, res, next) => {
    const { body } = req;
    if (!body.nome && !body.password && !body.telefone) {
        return res.status(400).json({ message: 'Necessario todos os dados para cadastro de novos administradores' })
    }
    next();
}

const verificaDeleteUsuario = (req, res, next) => {
    const { body } = req;
    const camposObrigatorios = ['nome', 'password', 'telefone', 'codigo'];
    
    const camposFaltando = camposObrigatorios.filter(campo => !body[campo]);

    if (camposFaltando.length > 0) {
        const mensagemErro = `Campos obrigatórios faltando: ${camposFaltando.join(', ')}`;
        return res.status(400).json({ message: mensagemErro });
    }
    next();
}

const verificaUpdateUsuario = (req, res, next) => {
    console
    const { body } = req;
    if (!body.nome && !body.telefone && !body.password, !body.codigo) {
        return res.status(400).json({ message: 'Necessario informar nome, password, telefone e codigo para atualiazar dados.' })
    }
    next();
}

const verificaDeleteProntuario = (req, res, next) => {
    const { body } = req;
    if (!body.codigo && !body.paciente && !body.dataregistro && !body.codigo) {
        return res.status(400).json({ message: 'Necessario informar esses dados para remover prontuario.' })
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
    verificaDeleteProntuario,

}