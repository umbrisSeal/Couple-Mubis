const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const borrarAmigoModel = require("../models/borrarAmigoModel");
const verificaKeys = require("../validations/verificaKeys");
const borrarAmigoView = require("../views/borrarAmigoView");


async function borrarAmigoController(request, response) {

    if(!verificaKeys(request.body, ['amigoID'])) {
        response.status(403).send("La solicitud no tiene la estructura necesaria");
        return;
    }

    request.userID = obtenerUserIdToken(request.cookies['idToken']);
    request.amigoID = request.body.amigoID;

    await borrarAmigoModel(request);
    borrarAmigoView(request, response);
}

module.exports = borrarAmigoController;