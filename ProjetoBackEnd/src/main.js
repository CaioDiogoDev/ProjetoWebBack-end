const express = require('express');
const path = require('path');
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.send("Hello Word"));

app.listen(3000, () => console.log("Server Rodando"));

