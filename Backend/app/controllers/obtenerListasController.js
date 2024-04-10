const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const obtenerListasModel = require("../models/obtenerListasModel");


async function obtenerListasController(request, response) {

    const userID = obtenerUserIdToken(request.cookies['idToken']);

    const listaJSON = await obtenerListasModel(userID);


    response.status(200).send(listaJSON);
}

module.exports = obtenerListasController;