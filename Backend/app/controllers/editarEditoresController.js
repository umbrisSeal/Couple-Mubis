const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const editarEditoresModel = require("../models/editarEditoresModel");
const verificaKeys = require("../validations/verificaKeys");
const editarEditoresView = require("../views/editarEditoresView");


async function editarEditoresController(request, response) {

    request.userID = obtenerUserIdToken(request.cookies['idToken']);

    if(!verificaKeys(request.body, ['listaID', 'nuevosEditores', 'nuevosLectores'])) {
        response.status(403).send("La solicitud no tiene los campos requeridos.");
        return;
    }

    await editarEditoresModel(request);
    editarEditoresView(request, response);
}

module.exports = editarEditoresController;