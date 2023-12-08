const express = require('express');
const path = require('path');
require("dotenv").config();

const routes = require('./routes');

const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes.js'];

swaggerAutogen(outputFile, endpointsFiles);


const app = express();
app.use(express.json())

app.use(routes);

app.listen(3000, () => console.log("Server Rodando"));

