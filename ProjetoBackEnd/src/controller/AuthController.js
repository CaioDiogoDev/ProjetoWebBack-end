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
    
    ];
    const prontuariosData = [
        { situacaoPaciente: "gripe", dataRegistro: "2023-11-26", remedioPrescrito: "dramin", sintomas: "dor no corpo, dor de cabeça" },
        
    ];
    /*
   let usuario1 = await UsersModel.save("caio" , "43-998181781", "senha123", "admin");
   let usuario2 = await UsersModel.save("ingrid" , "43-998181721", "senha321", "padrao");
   let usuario3 = await UsersModel.save("maria" , "43-998181221", "senha145", "padrao");
   let usuario4 = await UsersModel.save("nathalia" , "43-998181331", "senha136", "padrao");
   let usuario5 = await UsersModel.save("antonio" , "43-998181441", "senha246", "padrao");
   let usuario6 = await UsersModel.save("luis" , "43-998181551", "senha222", "padrao");
   let usuario7 = await UsersModel.save("jonas" , "43-998181661", "senha333", "padrao");
   let usuario8 = await UsersModel.save("alberto" , "43-998181771", "senha111", "padrao");
   let usuario9 = await UsersModel.save("pedro" , "43-998181881", "senha119", "padrao");
   let usuario10 = await UsersModel.save("adriano" , "43-99818981", "senha888", "admin");

   let prontuario1 = await ProntuarioModel.save("gripe", "2023-11-26", "dramin", "dor no corpo, dor de cabeça");
   let prontuario2 = await ProntuarioModel.save("virose", "2023-10-26", "Tiorfan", "diarreia");
   let prontuario3 = await ProntuarioModel.save("garganta inflamada", "2023-11-12", "ibuprofeno", "dor de garganta");
   let prontuario4 = await ProntuarioModel.save("dengue", "2023-11-12", "dramin", "dor no corpo, dor de cabeça");
   let prontuario5 = await ProntuarioModel.save("covid", "2023-11-15", "paxlovid", "dor no corpo, dor de cabeça");
   let prontuario6 = await ProntuarioModel.save("malaria", "2023-11-18", "tafenoquina", "febre alta, calafrio");
   let prontuario7 = await ProntuarioModel.save("febre amarela", "2023-11-20", "dramin", "dor no corpo, dor de cabeça");
   let prontuario8 = await ProntuarioModel.save("h1n1", "2023-11-05", "dramin", "dor no corpo, dor de cabeça");
*/

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
    const verificaUsuarioCadastrado = await UsersModel.getByidName(req.body.nome, req.body.password);
    const tipoUsuario = verificaUsuarioCadastrado.dataValues.tipUsuario;
    //if(tipoUsuario === "admin"){
     //   const updateUser = await usersModel.update()
    //}
}

module.exports = { 
    verificarLogin,
    install,
    cadastroUsuario,
    cadastroAdmin,
    deleteUsuario
};
