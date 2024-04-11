const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const borrarListaModel = require("../models/borrarListaModel");
const validaID = require("../services/database/validaID");
const verificaKeys = require("../validations/verificaKeys");
const borrarListaView = require("../views/borrarListaView");


async function borrarListaController(request, response) {

    if(!verificaKeys(request.body, ['listaID'])) {
        response.status(403).send("La solicitud no tiene los campos requeridos.");
        return;
    }

    const userID = obtenerUserIdToken(request.cookies['idToken']);
    const listaID = request.body.listaID;

    if(!validaID(listaID, 10)) {
        response.status(403).send("El listaID proporcionado es incorrecto.");
        return;
    }

    request.userID = userID;
    request.listaID = listaID;

    await borrarListaModel(request, response);

    borrarListaView(request, response);
}

module.exports = borrarListaController;

