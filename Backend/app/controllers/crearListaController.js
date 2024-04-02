const validarNombreLista = require("../validations/validarNombreLista");
const verificaKeys = require("../validations/verificaKeys");


async function crearListaController(request, response) {

    if(!verificaKeys(request.body, ['nuevoNombre'])) {
        response.status(400).send("El Body de la solicitud no contiene el campo 'nuevoNombre'.");
        return;
    }


    response.send(`Su nombre de lista es: ${validarNombreLista(request.body.nuevoNombre)}`);
}


module.exports = crearListaController;