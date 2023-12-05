const UsersModel = require('../models/DAO/usersModel')
const ProntuarioModel = require('../models/DAO/ProntuarioModel')
const bd = require('../models/DAO/connection')

const jwt = require('jsonwebtoken');
const usersModel = require('../models/DAO/usersModel');

function createToken(id, userName) {
    return jwt.sign({ id, userName }, process.env.SECRET, { expiresIn: '1h' });
}

const verificarLogin = async (req, res) => {
    try {
        const verificaUsuarioCadastrado = await UsersModel.getByidName(req.body.nome, req.body.password);

        if (verificaUsuarioCadastrado) {
            const tipoUsuario = verificaUsuarioCadastrado.dataValues.tipUsuario;
            const { codigo, nome } = verificaUsuarioCadastrado.dataValues;

            if (tipoUsuario === 'medico') {
                const token = createToken(codigo, nome);
                return res.status(200).json({ ...verificaUsuarioCadastrado.dataValues, token });
            } else {
                return res.status(200).json(verificaUsuarioCadastrado.dataValues);
            }
        } else {
            return res.status(401).json({ error: 'Acesso não permitido' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};



const install = async (req, res) => {
    try {
        await bd.sync({ force: true });

        const usuariosData = [
            { nome: "caio", telefone: "43-998181781", password: "senha123", tipoUsuario: "medico" },
            { nome: "ingrid", telefone: "43-998181781", password: "senha1234", tipoUsuario: "enfermeira" },
            { nome: "maria", telefone: "43-998181221", password: "senha122", tipoUsuario: "enfermeira" },
            { nome: "luis", telefone: "43-998181661", password: "senha183", tipoUsuario: "medico" },
            { nome: "isabele", telefone: "43-998781781", password: "senha119", tipoUsuario: "enfermeira" }
        ]

        const prontuariosData = [
            { dataRegistro: "2023-11-26", paciente: "caio", situacaoPaciente: "gripe", remedioPrescrito: "dramin", sintomas: "dor no corpo, dor de cabeça" },
            { dataRegistro: "2023-10-11", paciente: "alberto", situacaoPaciente: "virose", remedioPrescrito: "dramin", sintomas: "dor no corpo, dor de cabeça" },
            { dataRegistro: "2023-09-26", paciente: "jonas", situacaoPaciente: "dor de garganta", remedioPrescrito: "ibuprofeno", sintomas: "dor no corpo, dor de cabeça" },
            { dataRegistro: "2023-12-02", paciente: "maria", situacaoPaciente: "dengue", remedioPrescrito: "paracetamol", sintomas: "dor no corpo, dor de cabeça" },
            { dataRegistro: "2023-11-13", paciente: "carol", situacaoPaciente: "covid", remedioPrescrito: "dramin", sintomas: "dor no corpo, dor de cabeça" },
            { dataRegistro: "2023-12-03", paciente: "camila", situacaoPaciente: "febre alta", remedioPrescrito: "ibuprofeno", sintomas: "dor no corpo, dor de cabeça" },
            { dataRegistro: "2023-09-23", paciente: "antonio", situacaoPaciente: "h1n1", remedioPrescrito: "paracetamol", sintomas: "dor no corpo, dor de cabeça" },
            { dataRegistro: "2023-08-26", paciente: "pedro", situacaoPaciente: "gripe", remedioPrescrito: "dramin", sintomas: "dor no corpo, dor de cabeça" },
            { dataRegistro: "2023-05-26", paciente: "manuel", situacaoPaciente: "diarreia", remedioPrescrito: "imosec", sintomas: "dor no corpo, dor de cabeça" },
            { dataRegistro: "2023-07-26", paciente: "henrique", situacaoPaciente: "tontura", remedioPrescrito: "dramin", sintomas: "dor no corpo, dor de cabeça" },
            { dataRegistro: "2023-10-26", paciente: "eduardo", situacaoPaciente: "covid", remedioPrescrito: "ibuprofeno", sintomas: "dor no corpo, dor de cabeça" }
        ];

        const usuariosPromises = usuariosData.map(data => UsersModel.save(data.nome, data.telefone, data.password, data.tipoUsuario));
        const prontuariosPromises = prontuariosData.map(data => ProntuarioModel.save(data.situacaoPaciente, data.dataRegistro, data.remedioPrescrito, data.sintomas, data.paciente));
        await Promise.all([...usuariosPromises, ...prontuariosPromises]);
        return res.status(201).json({ mensagem: 'Instalação concluida com sucesso' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro na instalação.' });
    }

}

const cadastroEnfermeira = async (req, res) => {
    try {
        const cadastroUser = await UsersModel.save(req.body.nome, req.body.password, req.body.telefone, "enfermeira");
        return res.status(201).json({ mensagem: 'Cadastro do usuario realizado com sucesso', cadastroUser });
    } catch (error) {
        return res.status(500).json({ error: 'Erro no cadastro da enfermeira' });
    }

}
const cadastroMedico = async (req, res) => {
    try {
        const cadastroAdmin = await UsersModel.save(req.body.nome, req.body.password, req.body.telefone, "medico");
        return res.status(201).json({ mensagem: 'Cadastro do admin realizado com sucesso', usuario: cadastroAdmin });

    } catch (error) {
        return res.status(500).json({ error: 'Erro no cadastro do medico' });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const usuarioDeletado = await UsersModel.delete(req.body.nome, req.body.password, req.body.telefone, req.body.codigo);
        return res.status(200).json({ mensagem: 'Usuario excluido com sucesso', usuario: usuarioDeletado });

    } catch (error) {
        return res.status(500).json({ error: 'Falha do tentar excluir usuario' });
    }
};

const UpdateUsuario = async (req, res) => {
    try {

        const verificaUsuarioCadastrado = await UsersModel.getByid(req.body.codigo);
        const { nome, password, telefone, codigo } = req.body;

        if (verificaUsuarioCadastrado != null) {
            await usersModel.update(nome, telefone, password, codigo)
            return res.status(200).json({ mensagem: 'Dados atualizados com sucesso!' })
        }
        else {
            return res.status(404).json({ mensagem: 'Nenhum dado atualizado' })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Falha ao tentar realizar atualização do cadastro' });
    }
}

const deleteProntuario = async (req, res) => {
    try {

        await ProntuarioModel.delete(req.body.codigo, req.body.paciente, req.body.dataRegistro);
        return res.status(200).json({ mensagem: 'Prontuario excluido com sucesso' });

    } catch (error) {
        return res.status(500).json({ error: 'Falha ao tentar excluir prontuario' });
    }
}

const UpdateProntuario = async (req, res) => {
    try {
      const result =  await ProntuarioModel.update(req.body.codigo, req.body.paciente, req.body.situacaoPaciente, req.body.remedioPrescrito, req.body.sintomas);
      console.log(result)
        return res.status(201).json({ mensagem: 'Prontuario atualizado com sucesso' });

    } catch (error) {
        return res.status(500).json({ error: 'AuthController - Falha ao tentar atualizar prontuario' });
    }
}


module.exports = {
    verificarLogin,
    install,
    cadastroEnfermeira,
    cadastroMedico,
    deleteUsuario,
    UpdateUsuario,
    deleteProntuario,
    UpdateProntuario
};
