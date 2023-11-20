const express = require('express');
const router = requeire('./rotas');

const app = express();

app.use(router);

module.exports = app;