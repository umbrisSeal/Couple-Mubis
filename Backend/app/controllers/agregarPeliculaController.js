const agregarPeliculaModel = require("../models/agregarPeliculaModel");
const validarPeliculaId = require("../validations/validarPeliculaId");
const verificaKeys = require("../validations/verificaKeys");
const agregarPeliculaView = require("../views/agregarPeliculaView");


async function agregarPeliculaController(request, response) {

    if(!verificaKeys(request.body, ['peliculaID', 'listaID'])) {
        response.status(403).send("El cuerpo de la solicitud es incorrecto.");
        return;
    }

    const body = request.body;

    if(!validarPeliculaId(body.peliculaID)) {
        response.status(403).send("El ID de la pelicula no es correcto.");
        return;
    }

    await agregarPeliculaModel(request, response);
    agregarPeliculaView(request, response);


    return;
}

module.exports = agregarPeliculaController;