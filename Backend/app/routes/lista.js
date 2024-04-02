
const express = require('express');
const lista = express.Router();

const auth = require('../auth/authenticar');
const crearListaController = require('../controllers/crearListaController');


lista.post("/", auth, crearListaController);





module.exports = lista;