const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const router = express.Router();

const controller = require('./controller/AuthController');
const validador = require('./middlewares/validador');



router.get('/install', controller.install);

router.post('/login', validador.verificaBodyLogin, controller.verificarLogin);

router.post('/cadastroUsuario', validador.verificaCadastroUsuario, controller.cadastroEnfermeira);

router.put('/atualizaCadastro', validador.verificaUpdateUsuario, controller.UpdateUsuario);

router.get('/ListarProntuario', validador.verificaEntradalistar, controller.ListaProntuario);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

router.use(validador.verificaToken); 

router.put('/atualizaCadastroAdmin', validador.verificaUpdateUsuario, controller.UpdateUsuario);

router.post('/cadastroAdmin', validador.verificaCadastroAdmin, controller.cadastroMedico);

router.delete('/deleteUsuario', validador.verificaDeleteUsuario, controller.deleteUsuario);

router.delete('/deleteProntuario', validador.verificaDeleteProntuario, controller.deleteProntuario);

router.put('/atualizaProntuario', validador.verificaUpdateProntuario, controller.UpdateProntuario)


module.exports = router;