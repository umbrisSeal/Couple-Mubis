
const express = require('express');
const amigos = express.Router();

const auth = require('../auth/authenticar');
const agregarAmigoController = require('../controllers/agregarAmigoController');
const borrarAmigoController = require('../controllers/borrarAmigoController');


amigos.post("/", auth, agregarAmigoController);
amigos.delete("/", auth, borrarAmigoController);



module.exports = amigos;