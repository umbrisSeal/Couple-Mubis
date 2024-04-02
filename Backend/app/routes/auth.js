
const express = require('express');
const auth = express.Router();

const iniciarSesionController = require('../controllers/iniciarSesionController');
const authenticar = require('../auth/authenticar');


auth.get("/", authenticar, (request, response) => {
    response.status(200).send("Usted esta autenticado.");
});

auth.post("/", iniciarSesionController);



module.exports = auth;