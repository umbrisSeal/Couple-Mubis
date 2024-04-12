const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const obtenerInfoUsuarioModel = require("../models/obtenerInfoUsuarioModel");
const obtenerInfoUsuarioView = require("../views/obtenerInfoUsuarioView");


async function obtenerInfoUsuarioController(request, response) {

    request.userID = obtenerUserIdToken(request.cookies['idToken']);

    await obtenerInfoUsuarioModel(request);
    obtenerInfoUsuarioView(request, response);
}

module.exports = obtenerInfoUsuarioController;