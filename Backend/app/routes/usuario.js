
const express = require('express');
const usuario = express.Router();

const listas = require('./usuario/listas');
const obtenerInfoUsuarioController = require('../controllers/obtenerInfoUsuarioController');
const auth = require("../auth/authenticar");

usuario.use("/listas", listas);

usuario.get("/", auth, obtenerInfoUsuarioController);


module.exports = usuario;
