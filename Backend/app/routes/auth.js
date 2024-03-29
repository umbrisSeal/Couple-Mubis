
const express = require('express');
const auth = express.Router();

const iniciarSesionController = require('../controllers/iniciarSesionController');
const authenticar = require('../auth/authenticar');


auth.get("/", authenticar, (request, response) => {
    response.status(200).send("Felicidades, si estas viendo esto es porque te autenticaste exitosamente!");
});

auth.post("/", iniciarSesionController);



module.exports = auth;