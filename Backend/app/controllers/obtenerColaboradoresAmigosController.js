const objetoVacio = require("../helpers/objetoVacio");
const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const obtenerColaboradoresAmigosModel = require("../models/obtenerColaboradoresAmigosModel");
const validaID = require("../services/database/validaID");
const verificaKeys = require("../validations/verificaKeys");
const obtenerColaboradoresAmigosView = require("../views/obtenerColaboradoresAmigosView");

async function obtenerColaboradoresAmigosController(request, response) {

    if(objetoVacio(request.params)) {
        response.status(403).send("No se ha provisto un ID de lista en la URL.");
        return;
    }
    if(!verificaKeys(request.params, ['listaID'])) {
        response.status(403).send("La solicitud no tiene el campo requerido listaID.");
        return;
    }
    request.listaID = request.params.listaID;
    request.userID = obtenerUserIdToken(request.cookies['idToken']);
    if(!validaID(request.listaID, 10)) {
        response.status(403).send("El ID provisto no tiene la estructura correcta.");
        return;
    }

    await obtenerColaboradoresAmigosModel(request);
    obtenerColaboradoresAmigosView(request, response)
}

module.exports = obtenerColaboradoresAmigosController;