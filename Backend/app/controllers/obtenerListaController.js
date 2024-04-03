const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const obtenerListaModel = require("../models/obtenerListaModel");
const validaID = require("../services/database/validaID");
const obtenerListaView = require("../views/obtenerListaView");


async function obtenerListaController(request, response) {

    // Validar param. if not 418.
    if(!validaID(request.params.listaID, 10)) {
        response.status(418).send("Error: El ID de la lista solicitada no es correcto.");
        console.log(request.params.listaID);
        return;
    }

    const userID = obtenerUserIdToken(request.cookies['idToken']);

    const respuesta = await obtenerListaModel(request.params.listaID);

    if(!respuesta) {
        response.status(400).send("La lista solicitada no existe.");
        return;
    };

    await obtenerListaView(userID, respuesta, response);
}

module.exports = obtenerListaController;