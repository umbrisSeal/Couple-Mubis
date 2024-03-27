
const crearCuentaModel = require("../models/crearCuentaModel");
const validacionSignin = require("../validations/validacionSignin");
const crearCuentaVista = require("../views/crearCuentaVista");

async function crearCuenta(request, response) {

    if(! await validacionSignin(request, response)) return;

    const respuesta = await crearCuentaModel(request, response);

    if(respuesta) {
        crearCuentaVista(request, response);
        return;
    } else {
        response.status(500).send("No se pudo crear al nuevo usuario.");
    }

}

module.exports = crearCuenta;


/*
    Estructura del Request Body:
    clave": "3MXFWGLVWF",
    "email": "micorreo@gmail.com",
    "usuario": "Rico McPato",
    "password": "Password-hash1",
    "passwordRepetido": "Password-hash1"

*/