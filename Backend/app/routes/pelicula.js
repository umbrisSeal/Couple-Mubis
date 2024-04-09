const express = require('express');
const pelicula = express.Router();

const auth = require("../auth/authenticar");
const obtenerPeliculaController = require('../controllers/obtenerPeliculaController');


pelicula.get("/", (req, res) => res.send("Compadre, me tiene que dar un ID de pelicula."));

pelicula.get("/:peliculaID", auth, obtenerPeliculaController);





module.exports = pelicula;