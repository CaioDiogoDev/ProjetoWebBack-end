const UsersModel = require('../models/DAO/usersModel')

const jwt = require('jsonwebtoken');

function createToken(id, userName){
    return jwt.sign({id, userName}, process.env.SECRET, {expiresIn: '1h'});
}

const verificarLogin = async (req, res) => {
    try {
        const verificaUsuarioCadastrada = await UsersModel.getByidName(req.body.nome, req.body.password);

        if (verificaUsuarioCadastrada !== null && verificaUsuarioCadastrada !== undefined) {
            const { tipoUsusario } = verificaUsuarioCadastrada;

            if (tipoUsusario === 'admin') {
                const token = createToken(id, userName);
                res.status(200).json({ ...verificaUsuarioCadastrada, token });
            } else {
                res.status(200).json(verificaUsuarioCadastrada);
            }
        } else {
            res.status(401).json({ error: 'Acesso não permitido' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = { verificarLogin };


module.exports = {
    verificarLogin
};