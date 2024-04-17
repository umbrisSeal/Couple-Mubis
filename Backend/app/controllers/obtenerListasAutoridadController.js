const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const obtenerListasAutoridadModel = require("../models/obtenerListasAutoridadModel");
const validaID = require("../services/database/validaID");
const verificaKeys = require("../validations/verificaKeys");
const obtenerListasAutoridadView = require("../views/obtenerListasAutoridadView");


async function obtenerListasAutoridadController(request, response) {

    if(!verificaKeys(request.body, ['peliculaID'])) {
        response.status(403).send("La solicitud no tiene la forma adecuada.");
        return;
    }

    if(!validaID(request.body.peliculaID)) {
        response.status(403).send("El peliculaID tiene la forma incorrecta.");
        return;
    }

    request.userID = obtenerUserIdToken(request.cookies['idToken']);

    await obtenerListasAutoridadModel(request);
    obtenerListasAutoridadView(request, response);
}

module.exports = obtenerListasAutoridadController;