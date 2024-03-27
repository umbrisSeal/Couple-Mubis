const generarTokens = require("../services/database/generarTokens");
const validarPassword = require("../services/database/validarPassword");


async function iniciarSesionModel(request, response) {

    const respuesta = await validarPassword(request.body.password, request.body.email);

    if(!respuesta) return respuesta;    // No coinciden los passwords.

    const tokens = await generarTokens(request);

    if(tokens === null) return false;

    return tokens;
}

module.exports = iniciarSesionModel;