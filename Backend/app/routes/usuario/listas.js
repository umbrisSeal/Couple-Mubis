
const express = require('express');
const obtenerListasController = require('../../controllers/obtenerListasController');
const auth = require("../../auth/authenticar");
const listas = express.Router();

listas.get("/", auth, obtenerListasController);


module.exports = listas;