
const express = require('express');
const usuario = express.Router();

const listas = require('./usuario/listas');

usuario.use("/listas", listas);


module.exports = usuario;
