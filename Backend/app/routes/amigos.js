
const express = require('express');
const amigos = express.Router();

const auth = require('../auth/authenticar');
const agregarAmigoController = require('../controllers/agregarAmigoController');
const borrarAmigoController = require('../controllers/borrarAmigoController');
const confirmarAmistadController = require('../controllers/confirmarAmistadController');
const colaboradores = require('./colaboradores/colaboradores');

amigos.use("/colaboradores", colaboradores);

amigos.get("/:amigoID", auth, confirmarAmistadController);
amigos.post("/", auth, agregarAmigoController);
amigos.delete("/", auth, borrarAmigoController);




module.exports = amigos;