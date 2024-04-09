const obtenerPeliculaModel = require("../models/obtenerPeliculaModel");
const validarPeliculaId = require("../validations/validarPeliculaId");
const verificaKeys = require("../validations/verificaKeys");


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

    const resultado = await obtenerPeliculaModel(peliculaID);

    // Mandar a solicitar los datos de la pelicula a la API. (Por medio del Modelo.)


    // Mandar a llamar la api en otra funcion.

    response.send("Ya esta");
}


module.exports = obtenerPeliculaController;