const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const agregarAmigoModel = require("../models/agregarAmigoModel");
const verificaKeys = require("../validations/verificaKeys");
const agregarAmigoView = require("../views/agregarAmigoView");

async function agregarAmigoController(request, response) {

    const userID = obtenerUserIdToken(request.cookies['idToken']);
    request.userID = userID;

    if(!verificaKeys(request.body, ['amigoID'])) {
        response.status(403).send("La solicitud no tiene el campo requerido.");
        return;
    }
    request.amigoID = request.body.amigoID;
    if(request.amigoID === userID) {
        response.status(403).send("No puede agregarse a si mismo como amigo.");
        return;
    }

    request.confirmacion = await agregarAmigoModel(request);
    agregarAmigoView(request, response);
}

module.exports = agregarAmigoController;