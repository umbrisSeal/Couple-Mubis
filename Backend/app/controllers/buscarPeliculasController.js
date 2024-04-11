const buscarPeliculaModel = require("../models/buscarPeliculasModel");
const verificaKeys = require("../validations/verificaKeys");
const buscarPeliculasView = require("../views/buscarPeliculasView");


async function buscarPeliculasController(request, response) {

    if(!verificaKeys(request.body, ['parametroBusqueda'])) {
        response.status(403).send("La solicitud no tiene la estructura requerida.");
        return;
    }

    await buscarPeliculaModel(request, response);
    
    buscarPeliculasView(request, response);
}

module.exports = buscarPeliculasController;