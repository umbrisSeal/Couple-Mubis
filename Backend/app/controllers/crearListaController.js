const crearListaModel = require("../models/crearListaModel");
const validarNombreLista = require("../validations/validarNombreLista");
const verificaKeys = require("../validations/verificaKeys");
const crearListaView = require("../views/crearListaView");


async function crearListaController(request, response) {

    if(!verificaKeys(request.body, ['nuevoNombre'])) {
        response.status(400).send("El Body de la solicitud no contiene el campo 'nuevoNombre'.");
        return;
    }
    if(!validarNombreLista(request.body.nuevoNombre)) {
        response.status(400).send("El nombre de la nueva lista no es valido.");
        return;
    }

    const resultado = await crearListaModel(request.body.nuevoNombre, request.cookies['idToken']);

    crearListaView(resultado, response);
}


module.exports = crearListaController;