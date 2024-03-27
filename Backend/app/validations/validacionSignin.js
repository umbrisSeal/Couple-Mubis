
/*
    Aplica un conjunto de validaciones para el body en un intento de registro de nuevo usuario.
*/

const emailExiste = require("../services/database/emailExiste");
const verificaKeys = require("./verificaKeys");
const verificarCorreo = require("./verificarCorreo");
const verificarNombre = require("./verificarNombre");
const verifivarClave = require("../services/database/validarClave");

async function validacionSignIn(request, response) {

    const body = request.body;

    if (!verificaKeys(body, ['clave', 'email', 'usuario', 'password', 'passwordRepetido'])) {
        response.status(400).send('BAD REQUEST: La solicitud no tiene el cuerpo necesario.');
        return false;
    }

    if(body.password != body.passwordRepetido) {
        response.status(400).send("BAD REQUEST: Los passwords no coinciden.");
        return false;
    }

    if(!verificarCorreo(body.email)) {
        response.status(400).send("BAD REQUEST: El correo no tiene la estructura correcta.");
        return false;
    }

    if(!verificarNombre(request.body.usuario)) {
        response.status(400).send("BAD REQUEST: El nombre de usuario no tiene la estructura correcta.");
        return false;
    }
    
    if(await emailExiste(body.email)) {
        response.status(409).send("CONFLICT: El email proporcionado ya existe.");
        return false;
    }

    if(! await verifivarClave(body.clave)) {
        response.status(403).send("FORBIDDEN: La clave de acceso no es valida.");
        return false;
    }

    return true;
}

module.exports = validacionSignIn