
const express = require('express');
const auth = express.Router();

const iniciarSesionController = require('../controllers/iniciarSesionController');

auth.get("/", (req, res) => {
    res.send("Bienvenido a auth!");
})

auth.post("/", iniciarSesionController);



module.exports = auth;