const cerrarSesionView = require("../views/cerrarSesionView");


async function cerrarSesionController(request, response) {

    cerrarSesionView(request, response);
}

module.exports = cerrarSesionController;