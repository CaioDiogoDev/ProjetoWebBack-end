const userModel = require('..//DAO/usersModel');

const jwt = require('jsonwebtoken');

function createToken(id, userName){
    return jwt.sign({id, userName}, process.env.SECRET, {expiresIn: '1h'});
}

app.post('/login', (req, res) => {
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


module.exports = {
    
}