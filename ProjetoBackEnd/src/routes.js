const express = require('express');

const {verificaToken} = require('./extensions/validador');
const app = express();




app.use(verificaToken) // todas as rotas que eu passar depois daqui vai verificar token. 


module.exports = app;