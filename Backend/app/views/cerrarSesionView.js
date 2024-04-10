

function cerrarSesionView(request, response) {

    response.clearCookie('idToken');
    response.clearCookie('sessionToken');
    response.status(200).send("Se ha cerrado sesion correctamente.");
}

module.exports = cerrarSesionView;