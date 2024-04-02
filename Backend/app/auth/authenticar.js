const validarIdToken = require("./validarIdToken");
const validarSessionToken = require("./validarSessionToken");
const refreshSessionToken = require("../helpers/refreshSessionToken");
const refreshIdToken = require("../helpers/refreshIdToken");

async function authController(request, response, next) {

    const cookies = request.cookies;

    if(!cookies['idToken', 'sessionToken']) {
        response.status(401).send("No tiene sus 2 tokens, por favor de authenticarse.");
        return;
    }

    const idTokenValido = await validarIdToken(cookies['idToken']);

    if(!idTokenValido) {
        response.clearCookie('idToken');
        response.clearCookie('sessionToken');
        response.status(401).send("Su idToken ya no es valido, por favor vuelva a autenticarse.");
        return;
    }

    refreshIdToken(cookies['idToken'], response);

    // Si el idToken fue valido, hay que borrarlo y actualizarlo para que se reinicie su tiempo de vida.

    const sessionTokenValido = await validarSessionToken(cookies['sessionToken'], cookies['idToken'], request.headers['user-agent']);

    if(!sessionTokenValido) {
        // Actualizar token.
        await refreshSessionToken(cookies['idToken'], request, response);
        next();
        return;
        // next?
    }

    // Ambos tokens aun siguen validos.
    next();
}

module.exports = authController;