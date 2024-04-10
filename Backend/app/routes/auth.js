
const express = require('express');
const auth = express.Router();

const iniciarSesionController = require('../controllers/iniciarSesionController');
const authenticar = require('../auth/authenticar');
const cerrarSesionController = require('../controllers/cerrarSesionController');


auth.get("/", authenticar, (request, response) => {
    response.status(200).send("Usted esta autenticado.");
});
auth.post("/", iniciarSesionController);
auth.delete("/", authenticar, cerrarSesionController);



module.exports = auth;