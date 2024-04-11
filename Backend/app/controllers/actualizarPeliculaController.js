const objetoVacio = require("../helpers/objetoVacio");
const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const actualizarPeliculaModel = require("../models/actualizarPeliculaModel");
const obtenerLista = require("../services/database/obtenerLista");
const validaID = require("../services/database/validaID");
const verificaKeys = require("../validations/verificaKeys");
const actualizarPeliculaView = require("../views/actualizarPeliculaView");


async function actualizarPeliculaController(request, response) {

    if(!verificaKeys(request.body, ['listaID', 'peliculas'])) {
        response.status(403).send("La solicitud no tiene los campos requeridos.");
        return;
    }

    if(!validaID(request.body.listaID, 10)) {
        response.status(403).send("El listaID proporcionado es incorrecto.");
        return;
    }

    if(objetoVacio(await obtenerLista(request.body.listaID))) {
        response.status(400).send("La lista solicitada no existe.");
        return;
    }

    request.userID = obtenerUserIdToken(request.cookies['idToken']);
    request.listaID = request.body.listaID;
    request.peliculas = request.body.peliculas;

    await actualizarPeliculaModel(request, response);

    actualizarPeliculaView(request, response);
}

module.exports = actualizarPeliculaController;