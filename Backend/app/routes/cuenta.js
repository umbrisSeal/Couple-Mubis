
const express = require('express');
const cuenta = express.Router();

const crearCuentaController = require('../controllers/crearCuentaController');


cuenta.get('/', (request, response) => {
    response.send('Bienvenido a cuenta!');
})

cuenta.post('/', crearCuentaController);


module.exports = cuenta;