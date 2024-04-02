const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const obtenerListasModel = require("../models/obtenerListasModel");


async function obtenerListasController(request, response) {

    const userID = obtenerUserIdToken(request.cookies['idToken']);

    const listaJSON = await obtenerListasModel(userID);


    response.status(200).send(listaJSON);



    //response.send("Todo bien");
    // Extraer idToken, extraer userID.
    // Mandar a llamar el modelo pasando el user ID.
    // El view se encarga de armar el JSON con los datos.
}

module.exports = obtenerListasController;