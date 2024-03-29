
/*
    Genera, registra y retorna los tokens Id Token y Session Token.
*/

const consultaUsuario = require("./consultaUsuario");
const registrarSessionToken = require("./registrarSessionToken");
const generarIdToken = require("../../helpers/generarIdToken");
const generarSessionToken = require("../../helpers/generarSessionToken");

async function generarTokens(request) {

    // Obtener la informacion del usuario necesaria: (userID) a partir de su email.
    const { userID } = await consultaUsuario(request.body.email);

    // Generar tokens:
    const idToken = generarIdToken(userID);
    const sessionToken = generarSessionToken(userID);

    // Registrar session token en la base de datos:
    const resultado = await registrarSessionToken(sessionToken, request.headers['user-agent']);

    return resultado ? {idToken, sessionToken} : null;
}

module.exports = generarTokens;

