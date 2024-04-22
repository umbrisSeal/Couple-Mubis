
const express = require('express');
const perfil = express.Router();

const auth = require('../auth/authenticar');
const obtenerPerfilUsuarioController = require('../controllers/obtenerPerfilUsuarioController');


perfil.get("/", auth, obtenerPerfilUsuarioController);


module.exports = perfil;