const agregarPeliculaModel = require("../models/agregarPeliculaModel");
const validarPeliculaId = require("../validations/validarPeliculaId");
const verificaKeys = require("../validations/verificaKeys");


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

    const resultado = await agregarPeliculaModel(request, response);

    // Proceder a solicitar la informacion de la API, nuestra base de datos y registrarla.

    //response.send(response.body);

    //response.send(request.body);
}

module.exports = agregarPeliculaController;