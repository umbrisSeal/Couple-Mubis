const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const editarCuentaModel = require("../models/editarCuentaModel");
const validacionEditarCuenta = require("../validations/validacionEditarCuenta");
const verificaKeys = require("../validations/verificaKeys");
const editarCuentaView = require("../views/editarCuentaView");

async function editarCuentaController(request, response) {

    request.userID = obtenerUserIdToken(request.cookies['idToken']);
    if(!verificaKeys(request.body, ['alias', 'usarAlias', 'usarPrivacidad', 'bibliografia', 'idiomaBusqueda'])) {
        response.status(403).send("La solicitud no tiene el cuerpo requerido.");
        return;
    }
    const body = request.body;

    if(!validacionEditarCuenta(request.body)) {
        response.status(403).status("Los valores en la solicitud no tienen el formato correcto.");
        return;
    }

    await editarCuentaModel(request);
    editarCuentaView(request, response);
}

module.exports = editarCuentaController;