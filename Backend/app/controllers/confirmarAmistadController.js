const objetoVacio = require("../helpers/objetoVacio");
const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const confirmarAmistadModel = require("../models/confirmarAmistadModel");
const validaID = require("../services/database/validaID");
const verificaKeys = require("../validations/verificaKeys");
const confirmarAmistadView = require("../views/confirmarAmistadView");


async function confirmarAmistadController(request, response) {

    if(objetoVacio(request.params)) {
        response.status(403).send("No se ha provisto un ID de amigo en la URL.");
        return;
    }
    if(!verificaKeys(request.params, ['amigoID'])) {
        response.status(403).send("La solicitud no tiene el campo requerido amigoID.");
        return;
    }
    request.amigoID = request.params.amigoID;
    request.userID = obtenerUserIdToken(request.cookies['idToken']);
    if(!validaID(request.amigoID, 10)) {
        response.status(403).send("El ID provisto no tiene la estructura correcta.");
        return;
    }

    await confirmarAmistadModel(request);
    confirmarAmistadView(request, response);
}

module.exports = confirmarAmistadController;