

function obtenerPerfilView(request, response) {

    if(request.error) {
        response.status(400).send("No se encontro el usuario solicitado.");
        return;
    }

    const datosUsuario = request.datosUsuario;
    const nombre = request.nombrePreferido;
    const listas = request.listas;

    const datosPerfil = {
        nombre,
        id: request.idSolicitado,
        xp: datosUsuario.puntosXP,
        bibliografia: datosUsuario.bibliografia,
        esAmigo: request.esAmigo,
        esBloqueado: request.esBloqueado,
        listas
    };

    if(request.esBloqueado || request.datosUsuario.usarPrivacidad) {
        response.status(401).send("No se puede mostrar la informacion solicitada.");
        return;
    }

    response.status(200).send(datosPerfil);
}

module.exports = obtenerPerfilView;