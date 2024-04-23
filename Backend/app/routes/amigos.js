
const express = require('express');
const amigos = express.Router();

const auth = require('../auth/authenticar');
const agregarAmigoController = require('../controllers/agregarAmigoController');


amigos.post("/", auth, agregarAmigoController);



module.exports = amigos;