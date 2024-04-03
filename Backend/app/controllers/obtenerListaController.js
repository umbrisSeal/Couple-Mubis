const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const obtenerListaModel = require("../models/obtenerListaModel");
const validaID = require("../services/database/validaID");


async function obtenerListaController(request, response) {

    // Validar param. if not 418.
    if(!validaID(request.params.listaID)) {
        response.status(418).send("Error: El ID de la lista solicitada no es correcto.");
        return;
    }

    const userID = obtenerUserIdToken(request.cookies['idToken']);

    const respuesta = await obtenerListaModel(request.params.listaID, userID);


    response.send(`El parametro ingresado fue: ${userID}`);
}

module.exports = obtenerListaController;