const consultaUsuario = require("../services/database/consultaUsuario");


async function obtenerInfoUsuarioModel(request) {

    request.infoUsuario = await consultaUsuario(request.userID);
}

module.exports = obtenerInfoUsuarioModel;