const objetoVacio = require("../helpers/objetoVacio");
const consultaUsuarios = require("../services/database/consultaUsuarios");

async function confirmarAmistadModel(request) {

    const datosUsuarios = await consultaUsuarios([request.userID, request.amigoID]);
    const amigosUsuario = datosUsuarios[0].amigos;
    const amigosAmigo = datosUsuarios[1].amigos;

    if(objetoVacio(datosUsuarios[0]) || objetoVacio(datosUsuarios[1])) {
        request.error = true;
        return;
    }
    request.error = false;

    const sonAmigos = amigosUsuario.includes(request.amigoID) && amigosAmigo.includes(request.userID);
    request.sonAmigos = sonAmigos;
}

module.exports = confirmarAmistadModel;