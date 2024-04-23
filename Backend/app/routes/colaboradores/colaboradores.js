
const express = require('express');
const colaboradores = express.Router();

const auth = require('../../auth/authenticar');
const obtenerColaboradoresAmigosController = require('../../controllers/obtenerColaboradoresAmigosController');


colaboradores.get("/:listaID", auth, obtenerColaboradoresAmigosController);


module.exports = colaboradores;