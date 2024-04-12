const objetoVacio = require("../helpers/objetoVacio");
const obtenerImgPerfil = require("../helpers/obtenerImgPerfil");


function obtenerInfoUsuarioView(request, response) {

    const infoUsuario = request.infoUsuario;

    if (!infoUsuario || objetoVacio(infoUsuario)) {
        response.status(400).send("Usuario no encontrado.");
        return;
    }

    const nombreUsuario = infoUsuario.usarAlias ? infoUsuario.alias : infoUsuario.usuario;

    const informacionUsuario = {
        usuarioId: request.userID,
        imagenPerfil: obtenerImgPerfil(infoUsuario.imgPerfilID),
        nombreUsuario,
        xpTotal: infoUsuario.puntosXP,
    }

    response.status(200).json(informacionUsuario);
}

module.exports = obtenerInfoUsuarioView;