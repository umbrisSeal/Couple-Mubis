const objetoVacio = require("../helpers/objetoVacio");
const consultaUsuarios = require("../services/database/consultaUsuarios");

async function confirmarAmistadModel(request) {

    const datosUsuarios = await consultaUsuarios([request.userID, request.amigoID]);

    if(datosUsuarios.length !== 2) {
        request.error = true;
        return;
    }

    if(objetoVacio(datosUsuarios[0]) || objetoVacio(datosUsuarios[1])) {
        request.error = true;
        return;
    }

    const amigosUsuario = datosUsuarios[0].amigos;
    const amigosAmigo = datosUsuarios[1].amigos;

    request.error = false;

    const sonAmigos = amigosUsuario.includes(request.amigoID) && amigosAmigo.includes(request.userID);
    request.sonAmigos = sonAmigos;
}

module.exports = confirmarAmistadModel;