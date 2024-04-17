
const express = require('express');
const obtenerListasController = require('../../controllers/obtenerListasController');
const auth = require("../../auth/authenticar");
const obtenerListasAutoridadController = require('../../controllers/obtenerListasAutoridadController');
const listas = express.Router();

listas.get("/", auth, obtenerListasController);
listas.post("/", auth, obtenerListasAutoridadController);


module.exports = listas;