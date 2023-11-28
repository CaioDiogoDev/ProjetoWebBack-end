const express = require('express');
const  router = express.Router();

const controller = require('./controller/AuthController');
const validador = require('./middlewares/validador');

//const { verificarLogin } = require('./controller/AuthController')

router.get('/install', controller.install);

router.post('/login', validador.verificaBodyLogin, controller.verificarLogin);

router.post('/cadastroUsuario', validador.verificaCadastroUsuario, controller.cadastroUsuario);



router.put('/atualizaCadastro', validador.verificaCadastroUsuario, controller.cadastroUsuario);


router.use(validador.verificaToken); // todas as rotas que eu passar depois daqui vai verificar token. 

router.post('/cadastroAdmin', validador.verificaCadastroAdmin, controller.cadastroAdmin);

router.delete('/deleteUsuario', validador.verificaDeleteUsuario, controller.deleteUsuario);

module.exports = router;