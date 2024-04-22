
const express = require('express');
const perfil = express.Router();

const auth = require('../auth/authenticar');
const obtenerPerfilUsuarioController = require('../controllers/obtenerPerfilUsuarioController');
const obtenerPerfilController = require('../controllers/obtenerPerfilController');


perfil.get("/", auth, obtenerPerfilUsuarioController);
perfil.post("/", auth, obtenerPerfilController);


module.exports = perfil;