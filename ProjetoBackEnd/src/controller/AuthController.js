const userModel = require('..//DAO/usersModel');

const jwt = require('jsonwebtoken');

function createToken(id, userName){
    return jwt.sign({id, userName}, 'SECRETY_KEY', {expiresIn: '1h'});
}

app.post('/ObterToken', (req, res) => {
    const {userName, passwrod} = req.body;

    if(userName === 'admin' && passwrod === '123456'){
        const id = 1;
        const token = createToken(id,userName);
        res.json({token});
    }
    else{
        res.status(401).json({eror:'seu usuario não é admin'});
    }
});

function verificaToken(req, res, next){
    const token = req.headers['authorization'];

    if(!token){
        return res.status(403).json({error: 'token invalido'})
    }

    req.userId = decode.id
}