const UsersModel = require('../models/DAO/usersModel')
const ProntuarioModel = require('../models/DAO/ProntuarioModel')
const bd = require('../models/DAO/connection')

const jwt = require('jsonwebtoken');

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
                res.status(200).json({ ...verificaUsuarioCadastrado.dataValues, token });
            } else {
                res.status(200).json(verificaUsuarioCadastrado.dataValues);
            }
        } else {
            res.status(401).json({ error: 'Acesso não permitido' });
        }        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
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

module.exports = { verificarLogin, install };
