
const express = require('express');
const lista = express.Router();

const auth = require('../auth/authenticar');
const crearListaController = require('../controllers/crearListaController');
const obtenerListaController = require('../controllers/obtenerListaController');


lista.get("/:listaID", auth, obtenerListaController);
lista.post("/", auth, crearListaController);





module.exports = lista;