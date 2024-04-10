const express = require('express');
const pelicula = express.Router();

const auth = require("../auth/authenticar");
const obtenerPeliculaController = require('../controllers/obtenerPeliculaController');
const obtenerRecomendacionesController = require('../controllers/obtenerRecomendacionesController');
const agregarPeliculaController = require('../controllers/agregarPeliculaController');


pelicula.get("/", auth, obtenerRecomendacionesController);
pelicula.post("/", auth, agregarPeliculaController);
pelicula.get("/:peliculaID", auth, obtenerPeliculaController);





module.exports = pelicula;