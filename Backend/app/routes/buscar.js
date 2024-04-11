
const express = require("express");
const buscarPeliculasController = require("../controllers/buscarPeliculasController");
const buscar = express.Router();

buscar.post("/", buscarPeliculasController);




module.exports = buscar;