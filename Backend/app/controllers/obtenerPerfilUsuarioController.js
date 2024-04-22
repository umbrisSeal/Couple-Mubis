const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const obtenerPerfilUsuarioModel = require("../models/obtenerPerfilUsuarioModel");
const obtenerPerfilUsuarioView = require("../views/obtenerPerfilUsuarioView");

async function obtenerPerfilUsuarioController(request, response) {

    request.userID = obtenerUserIdToken(request.cookies['idToken']);

    await obtenerPerfilUsuarioModel(request);
    obtenerPerfilUsuarioView(request, response);
}

module.exports = obtenerPerfilUsuarioController;