const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const obtenerPerfilModel = require("../models/obtenerPerfilModel");
const verificaKeys = require("../validations/verificaKeys");
const obtenerPerfilView = require("../views/obtenerPerfilView");


async function obtenerPerfilController(request, response) {

    if(!verificaKeys(request.body, ['idSolicitado'])) {
        response.status(403).send("La solicitud no tiene el cuerpo requerido.");
        return;
    }

    request.idSolicitado = request.body.idSolicitado;
    request.userID = obtenerUserIdToken(request.cookies['idToken']);

    await obtenerPerfilModel(request);
    obtenerPerfilView(request, response);
}

module.exports = obtenerPerfilController;