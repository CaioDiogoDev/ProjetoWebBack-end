const express = require('express');
const  router = express.Router();

const controller = require('./controller/AuthController');
const validador = require('./middlewares/validador');

const { verificarLogin } = require('./controller/AuthController')

router.get('/install', controller.install);

router.post('/login', validador.verificaBodyLogin, verificarLogin);

router.use(validador.verificaToken); // todas as rotas que eu passar depois daqui vai verificar token. 


module.exports = router;