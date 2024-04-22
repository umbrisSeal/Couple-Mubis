const consultaUsuario = require("../services/database/consultaUsuario");


async function obtenerPerfilUsuarioModel(request) {
    const informacionUsuario = await consultaUsuario(request.userID);
    request.informacionUsuario = informacionUsuario;
}

module.exports = obtenerPerfilUsuarioModel;