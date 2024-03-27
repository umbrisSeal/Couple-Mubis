
const crearUsuario = require("../services/database/crearUsuario");
const validacionSignin = require("../validations/validacionSignin");

async function crearCuenta(request, response) {
    

    if(! await validacionSignin(request, response)) return;
    crearUsuario(request.body);


    response.status(200).send('Operacion exitosa, se ha creado un nuevo usuario.');
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