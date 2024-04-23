const borrarAmigo = require("../services/database/borrarAmigo");


async function borrarAmigoModel(request) {
    const confirmacion = await borrarAmigo(request.userID, request.amigoID);
    request.confirmacion = confirmacion;
}

module.exports = borrarAmigoModel;