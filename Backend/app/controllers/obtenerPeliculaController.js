const obtenerPeliculaModel = require("../models/obtenerPeliculaModel");
const validarPeliculaId = require("../validations/validarPeliculaId");
const verificaKeys = require("../validations/verificaKeys");
const obtenerPeliculaView = require("../views/obtenerPeliculaView");


async function obtenerPeliculaController(request, response) {

    // Validar si se envio un param correcto (con las especificaciones de la API).
    if(!verificaKeys(request.params, ['peliculaID'])) {
        response.status(400).send("No se ha provisto el ID de pelicula necesario.");
        return;
    }

    const peliculaID = request.params['peliculaID'];

    if(!validarPeliculaId(peliculaID)) {
        response.status(400).send("El ID provisto tiene un formato incorrecto.");
        return;
    }

    const resultado = await obtenerPeliculaModel(parseInt(peliculaID));

    if(!resultado) {
        response.status(400).send("No se encontro la pelicula solicitada.");
        return;
    }

    request.resultado = resultado;

    obtenerPeliculaView(request, response);
    return;
}


module.exports = obtenerPeliculaController;