const UsersModel = require('../models/DAO/usersModel')
const ProntuarioModel = require('../models/DAO/ProntuarioModel')
const bd = require('../models/DAO/connection')

const jwt = require('jsonwebtoken');
const usersModel = require('../models/DAO/usersModel');

function createToken(id, userName){
    return jwt.sign({id, userName}, process.env.SECRET, {expiresIn: '1h'});
}

const verificarLogin = async (req, res) => {
    try {
        const verificaUsuarioCadastrado = await UsersModel.getByidName(req.body.nome, req.body.password);
         
        if (verificaUsuarioCadastrado) {
            const tipoUsuario = verificaUsuarioCadastrado.dataValues.tipUsuario;
            const { codigo, nome } = verificaUsuarioCadastrado.dataValues;
        
            if (tipoUsuario === 'admin') {
                const token = createToken(codigo, nome);
                return res.status(200).json({ ...verificaUsuarioCadastrado.dataValues, token });
            } else {
               return res.status(200).json(verificaUsuarioCadastrado.dataValues);
            }
        } else {
           return res.status(401).json({ error: 'Acesso não permitido' });
        }        
    } catch (error) {
        console.error(error);
       return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};



const install = async (req, res ) => {
   await bd.sync({force: true});

   const usuariosData = [
    { nome: "caio", telefone: "43-998181781", password: "senha123", tipoUsuario: "admin" },
    { nome: "ingrid", telefone: "43-998181781", password: "senha1234", tipoUsuario: "user" },
    { nome: "maria", telefone: "43-998181221", password: "senha122", tipoUsuario: "user" },
    { nome: "nathalia", telefone: "43-998181441", password: "senha13", tipoUsuario: "user" },
    { nome: "antonio", telefone: "43-998181681", password: "senha153", tipoUsuario: "user" },
    { nome: "luis", telefone: "43-998181661", password: "senha183", tipoUsuario: "user" },
    { nome: "alberto", telefone: "43-998151781", password: "senha193", tipoUsuario: "user" },
    { nome: "adriano", telefone: "43-998781781", password: "senha119", tipoUsuario: "admin" },

    
    ];
    const prontuariosData = [
        { situacaoPaciente: "gripe", dataRegistro: "2023-11-26", remedioPrescrito: "dramin", sintomas: "dor no corpo, dor de cabeça" },
        { situacaoPaciente: "virose", dataRegistro: "2023-10-26", remedioPrescrito: "Tiorfan", sintomas: "diarreia" },
        { situacaoPaciente: "garganta inflamada", dataRegistro: "2023-11-12", remedioPrescrito: "ibuprofeno", sintomas: "dor de garganta" },
        { situacaoPaciente: "dengue", dataRegistro: "2023-11-12", remedioPrescrito: "dramin", sintomas: "dor no corpo, dor de cabeça" },
        { situacaoPaciente: "covid", dataRegistro: "2023-11-15", remedioPrescrito: "paxlovid", sintomas: "dor no corpo, dor de cabeça mais perda de paladar" },
        { situacaoPaciente: "malaria", dataRegistro: "2023-11-25", remedioPrescrito: "tafenoquina", sintomas: "febre alta, calafrio" },
        { situacaoPaciente: "febre", dataRegistro: "2023-11-20", remedioPrescrito: "dramin", sintomas: "febre alta, calafrio" },
        { situacaoPaciente: "h1n1", dataRegistro: "2023-11-22", remedioPrescrito: "dramin", sintomas: "dor no corpo, dor de cabeça" },

    ];
   
   const usuariosPromises = usuariosData.map(data => UsersModel.save(data.nome, data.telefone, data.password, data.tipoUsuario));
   const prontuariosPromises = prontuariosData.map(data => ProntuarioModel.save(data.situacaoPaciente, data.dataRegistro, data.remedioPrescrito, data.sintomas));
   await Promise.all([...usuariosPromises, ...prontuariosPromises]);
  
}

const cadastroUsuario = async (req, res) => {
    try {
        const cadastroUser = await UsersModel.save(req.body.nome, req.body.password,req.body.telefone);
        return  res.status(201).json({ mensagem: 'Cadastro do usuario realizado com sucesso', cadastroUser});
    } catch (error) {
       return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    
}
const cadastroAdmin = async (req, res) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ error: 'Cadastro não permitido - Token não fornecido' });
        }

        jwt.verify(token, process.env.SECRET, async (erro) => {
            if (erro) {
                return res.status(401).json({ error: 'Cadastro não permitido - Token inválido' });
            }
            const cadastroAdmin = await UsersModel.save(req.body.nome, req.body.password, req.body.telefone);
            return res.status(201).json({ mensagem: 'Cadastro do admin realizado com sucesso', usuario: cadastroAdmin });
        });
    }catch (error) {
       return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ error: 'Operação de exclusão invalida - Token não fornecido' });
        }

        jwt.verify(token, process.env.SECRET, async (erro) => {
            if (erro) {
                return res.status(401).json({ error: 'Operação de exclusão invalida - Token inválido' });
            }
            const cadastroAdmin = await UsersModel.delete(req.body.nome, req.body.telefone,  req.body.id);
            return res.status(204).json({ mensagem: 'Usuario excluido com sucesso', usuario: cadastroAdmin });
        });
    }catch (error) {
       return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const UpdateUsuario = async (req, res) => {

    try {
        const verificaUsuarioCadastrado = await UsersModel.getByidName(req.body.nome, req.body.password);
        const tipoUsuario = verificaUsuarioCadastrado.dataValues.tipUsuario;
        const nomeUser = verificaUsuarioCadastrado.dataValues.nome;
        const telefoneUser = verificaUsuarioCadastrado.dataValues.telefone;
    
        if(tipoUsuario != 'admin' && nomeUser === res.body.nome && telefoneUser === res.body.telefone){
           const updateUser = await usersModel.update(res.body.nome, res.body.telefone, res.body.tipUsuario)
        }
        else{
            const updateUser = await usersModel.update(res.body.nome, res.body.telefone, res.body.tipUsuario)
        }
        res.status(200).json({mensagem: 'Dados atualizados com sucesso!', usuario: updateUser})
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

module.exports = { 
    verificarLogin,
    install,
    cadastroUsuario,
    cadastroAdmin,
    deleteUsuario,
    UpdateUsuario
};
