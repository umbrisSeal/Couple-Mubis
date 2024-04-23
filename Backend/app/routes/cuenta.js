
const express = require('express');
const cuenta = express.Router();

const auth = require('../auth/authenticar');
const crearCuentaController = require('../controllers/crearCuentaController');
const editarCuentaController = require('../controllers/editarCuentaController');


cuenta.post('/', crearCuentaController);
cuenta.put("/", auth, editarCuentaController);


module.exports = cuenta;