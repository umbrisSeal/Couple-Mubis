
const express = require('express');
const auth = express.Router();

const iniciarSesionController = require('../controllers/iniciarSesionController');
const authController = require('../controllers/authController');


auth.get("/", authController);

auth.post("/", iniciarSesionController);



module.exports = auth;