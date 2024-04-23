const objetoVacio = require("../helpers/objetoVacio");


function obtenerPerfilUsuarioView(request, response) {

    const informacionUsuario = request.informacionUsuario;
    if(objetoVacio(informacionUsuario)) {
        response.status(400).send("Ha ocurrido un error al solicitar la informacion del usuario.");
        return;
    }

    const respuesta = {
        id: informacionUsuario.userID,
        nombre: informacionUsuario.usuario,
        xp: informacionUsuario.puntosXP,
        alias: informacionUsuario.alias,
        bibliografia: informacionUsuario.bibliografia,
        usarAlias: informacionUsuario.usarAlias,
        usarPrivacidad: informacionUsuario.usarPrivacidad,
        usuariosBloqueados: informacionUsuario.bloqueados,
        idiomaBusqueda: informacionUsuario.idiomaBusqueda
    }

    response.status(200).send(respuesta);
}

module.exports = obtenerPerfilUsuarioView;
