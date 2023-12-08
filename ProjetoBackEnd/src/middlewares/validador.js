const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

function verificaToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Operação inválida - Token não fornecido' });
    }
    const tokenComBearer = token;

    const tokenSemBearer = tokenComBearer.replace('Bearer ', '').trim();
    console.log(tokenSemBearer)
    

    jwt.verify(tokenSemBearer, process.env.SECRET, (erro) => {
        if (erro) {
            console.error('Erro ao verificar token:', erro);
            return res.status(401).json({ error: 'Operação inválida - Token inválido' });
        }

        next();
    });
}

const verificaBodyLogin = (req, res, next) => {
    const { body } = req;
    const camposObrigatorios = ['nome', 'password'];

    const camposFaltando = camposObrigatorios.filter(campo => !body[campo]);

    if (camposFaltando.length > 0) {
        const mensagemErro = `Campos obrigatórios faltando: ${camposFaltando.join(', ')}`;
        return res.status(400).json({ message: mensagemErro });
    }
    next();
}

const verificaCadastroUsuario = (req, res, next) => {
    const { body } = req;
    const camposObrigatorios = ['nome', 'password', 'telefone'];

    const camposFaltando = camposObrigatorios.filter(campo => !body[campo]);

    if (camposFaltando.length > 0) {
        const mensagemErro = `Campos obrigatórios faltando: ${camposFaltando.join(', ')}`;
        return res.status(400).json({ message: mensagemErro });
    }
    next();
}

const verificaCadastroAdmin = (req, res, next) => {
    const { body } = req;
    const camposObrigatorios = ['codigo',' nome', 'password', 'telefone'];

    const camposFaltando = camposObrigatorios.filter(campo => !body[campo]);

    if (camposFaltando.length > 0) {
        const mensagemErro = `Campos obrigatórios faltando: ${camposFaltando.join(', ')}`;
        return res.status(400).json({ message: mensagemErro });
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
    const { body } = req;
    const camposObrigatorios = ['nome', 'telefone', 'password', 'codigo'];

    const camposFaltando = camposObrigatorios.filter(campo => !body[campo]);

    if (camposFaltando.length > 0) {
        const mensagemErro = `Campos obrigatórios faltando: ${camposFaltando.join(', ')}`;
        return res.status(400).json({ message: mensagemErro });
    }
    next();
}

const verificaDeleteProntuario = (req, res, next) => {
    const { body } = req;
    const camposObrigatorios = ['paciente', 'dataregistro', 'codigo'];

    const camposFaltando = camposObrigatorios.filter(campo => !body[campo]);

    if (camposFaltando.length > 0) {
        const mensagemErro = `Campos obrigatórios faltando: ${camposFaltando.join(', ')}`;
        return res.status(400).json({ message: mensagemErro });
    }
    next();
}

const verificaUpdateProntuario = (req, res, next) => {
    const { body } = req;
    const camposObrigatorios = ['situacaoPaciente', 'remedioPrescrito', 'sintomas'];

    const camposFaltando = camposObrigatorios.filter(campo => !body[campo]);

    if (camposFaltando.length > 0) {
        const mensagemErro = `Campos obrigatórios faltando: ${camposFaltando.join(', ')}`;
        return res.status(400).json({ message: mensagemErro });
    }
    next();
}

const verificaEntradalistar = (req, res, next) => {
    const { pagina, limite } = req.query;
    if (!pagina || !limite) {
        return res.status(400).json({ error: 'Os parâmetros paginam e limite são obrigatórios.' });
    }
    next();
}


module.exports = {
    verificaToken,
    verificaBodyLogin,
    verificaCadastroUsuario,
    verificaCadastroAdmin,
    verificaDeleteUsuario,
    verificaUpdateUsuario,
    verificaDeleteProntuario,
    verificaUpdateProntuario,
    verificaEntradalistar

}