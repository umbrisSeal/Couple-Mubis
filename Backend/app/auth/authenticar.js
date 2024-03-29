const validarIdToken = require("./validarIdToken");
const validarSessionToken = require("./validarSessionToken");
const refreshSessionToken = require("../helpers/refreshSessionToken");

async function authController(request, response, next) {

    //response.send("Bienvenido a auth 2! ¿Me permite sus tokens por favor?");

    /*
        Estados:
        0 = Solicitar reautenticacion.
        1 = Solicitar refresh de session token.
        2 = Autenticado.
    */

    const cookies = request.cookies;

    if(!cookies['idToken', 'sessionToken']) {
        response.status(200).send("No tiene sus 2 tokens, por favor de authenticarse.");
        // Redireccion a iniciar sesion. (frontend)
        // Llama a la vista aqui con un status de 0 para que mande el json con ese valor.
        // Esto es solo para este endpoint, normalmente usaremos el helper autenticar para retornar el status de nivel de autorizacion de manera interna.
        return;
        // Lanzar un error para ir al middleware correspondiente?
    }

    // Tiene sus tokens, hay que revisar si son validos.
    // 1. El idToken debe de ser valido, debe de tener la firma adecuada y userID debe de existir. {si falla autenticar}
    // 2. El sessionToken debe de estar firmado, debe de coincidir su userID (con el idToken dado) y la sesion debe de existir en la DB junto con el mismo userID de ambos tokens. {si falla, solicitar un refresh.}
    // 3. si todo estuvo correcto, retornar un status correcto. retornar siempre 200 con codigo de autenticacion.

    const idTokenValido = await validarIdToken(cookies['idToken']);

    if(!idTokenValido) {
        response.clearCookie('idToken');
        response.clearCookie('sessionToken');
        response.status(200).send("Su idToken ya no es valido, por favor vuelva a autenticarse.");
        return;
    }

    // Si el idToken fue valido, hay que borrarlo y actualizarlo para que se reinicie su tiempo de vida.

    const sessionTokenValido = await validarSessionToken(cookies['sessionToken'], cookies['idToken'], request.headers['user-agent']);

    if(!sessionTokenValido) {
        // Actualizar token.
        await refreshSessionToken(cookies['idToken'], request, response);
        //response.status(200).send("Su session token ha sido actualizado.");
        next();
        return;
        // next?
    }

    // Ambos tokens aun siguen validos.
    next();
    //response.status(200).json(cookies);
}

module.exports = authController;