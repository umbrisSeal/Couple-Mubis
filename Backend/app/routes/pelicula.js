const express = require('express');
const pelicula = express.Router();

const auth = require("../auth/authenticar");
const obtenerPeliculaController = require('../controllers/obtenerPeliculaController');
const obtenerRecomendacionesController = require('../controllers/obtenerRecomendacionesController');


pelicula.get("/", auth, obtenerRecomendacionesController);

pelicula.get("/:peliculaID", auth, obtenerPeliculaController);





module.exports = pelicula;