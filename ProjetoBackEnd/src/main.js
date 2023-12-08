const express = require('express');
const path = require('path');
require("dotenv").config();

const routes = require('./routes')


const app = express();
app.use(express.json())

app.use(routes);

app.listen(3000, () => console.log("Server Rodando"));

