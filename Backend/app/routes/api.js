const express = require('express');
const mainRouter = express.Router();

const cuenta = require('./cuenta');
const auth = require('./auth');
const usuario = require('./usuario');
const lista = require('./lista');
const pelicula = require('./pelicula');
const buscar = require('./buscar');
const perfil = require('./perfil');
const amigos = require('./amigos');
const token = require('./token');

mainRouter.use("/cuenta", cuenta);
mainRouter.use("/auth", auth);
mainRouter.use("/usuario", usuario);
mainRouter.use("/lista", lista);
mainRouter.use("/pelicula", pelicula);
mainRouter.use("/buscar", buscar);
mainRouter.use("/perfil", perfil);
mainRouter.use("/amigos", amigos);
mainRouter.use("/token", token);

module.exports = mainRouter;