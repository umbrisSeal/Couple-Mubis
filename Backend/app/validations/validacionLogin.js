
/*
    Aplica un conjunto de validaciones para el body en un login.
*/

const emailExiste = require("../services/database/emailExiste");
const verificaKeys = require("./verificaKeys");
const verificarCorreo = require("./verificarCorreo");

async function validacionLogin(request, response) {

    if (!verificaKeys(request.body, ['email', 'password'])) {
        response.status(400).send('BAD REQUEST: La solicitud no tiene el cuerpo necesario.');
        return false;
    }

    if(!verificarCorreo(request.body.email)) {
        response.status(400).send("BAD REQUEST: El correo no tiene la estructura correcta.");
        return false;
    }
    
    if(! await emailExiste(request.body.email)) {
        response.status(404).send("NOT FOUND: El correo proporcionado no esta registrado.");
        return false;
    }

    return true;
}

module.exports = validacionLogin