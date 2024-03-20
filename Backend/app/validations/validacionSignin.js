
/*
    Aplica un conjunto de validaciones para el body en un intento de registro de nuevo usuario.
*/

const emailExiste = require("../services/database/emailExiste");
const verificaKeys = require("./verificaKeys");
const verificarCorreo = require("./verificarCorreo");

function validacionSignIn(request, response) {

    const body = request.body;

    if (!verificaKeys(body, ['clave', 'email', 'usuario', 'password', 'passwordRepetido'])) {
        response.status(400).send('BAD REQUEST: La solicitud no tiene el cuerpo necesario.');
        return false;
    }

    if(!verificarCorreo(body.email) || body.password != body.passwordRepetido) {
        response.status(400).send("BAD REQUEST: El password no tiene la estructura correcta.");
        return false;
    }

    // Verificar que el email aun no existe en la base de datos.
    if(emailExiste(body.email)) {
        response.status(409).send("CONFLICT: El email proporcionado ya existe.");
        return false;
    }


    return true;
}

module.exports = validacionSignIn