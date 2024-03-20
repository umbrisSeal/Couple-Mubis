
/*
    Aplica un conjunto de validaciones para el body en un intento de registro de nuevo usuario.
*/

const verificaKeys = require("./verificaKeys");
const verificarCorreo = require("./verificarCorreo");

function validacionSignIn(request, response) {

    const body = request.body;

    if (!verificaKeys(body, ['clave', 'email', 'usuario', 'password', 'passwordRepetido'])) {
        response.status(400).send('Bad Request: La solicitud no tiene el cuerpo necesario.');
        return false;
    }

    if(!verificarCorreo(body.email) || body.password != body.passwordRepetido) {
        // Hacer todas las validaciones necesarias.
        response.status(400).send("Bad Request: El password no tiene la estructura correcta.");
        return false;
    }

    return true;
}

module.exports = validacionSignIn