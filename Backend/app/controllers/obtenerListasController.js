const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");


function obtenerListasController(request, response) {

    const userID = obtenerUserIdToken(request.cookies['idToken']);


    response.status(200).json({userID: userID});



    //response.send("Todo bien");
    // Extraer idToken, extraer userID.
    // Mandar a llamar el modelo pasando el user ID.
    // El view se encarga de armar el JSON con los datos.
}

module.exports = obtenerListasController;