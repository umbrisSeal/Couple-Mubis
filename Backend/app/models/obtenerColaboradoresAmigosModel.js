const objetoVacio = require("../helpers/objetoVacio");
const confirmarAmistad = require("../services/database/confirmarAmistad");
const consultaUsuario = require("../services/database/consultaUsuario");
const consultaUsuarios = require("../services/database/consultaUsuarios");
const obtenerLista = require("../services/database/obtenerLista");

async function obtenerColaboradoresAmigosModel(request) {

    const datosUsuario = await consultaUsuario(request.userID);
    const amigosUsuario = datosUsuario.amigos;
    const userID = request.userID;
    const listaID = request.listaID;
    const amistadConfirmada = [];

    // Verificar la amistad de cada usuario y filtrar solo los amigos verificados.
    for(i = 0; i < amigosUsuario.length; i++) {
        const amistadVerificada = await confirmarAmistad(userID, amigosUsuario[i]);
        amistadConfirmada.push(amistadVerificada);
    }
    const amigosVerificados = amigosUsuario.filter((amigo, index) => {
        return amistadConfirmada[index];
    });

    const datosAmigos = await consultaUsuarios(amigosVerificados);
    request.datosAmigos = datosAmigos;

    const datosLista = await obtenerLista(listaID);
    if(objetoVacio(datosLista)) {
        request.error = true;
        return;
    }
    request.error = false;
    const colaboradoresLista = [...datosLista.editores, ...datosLista.lectores];
    request.colaboradoresLista = colaboradoresLista;
}

module.exports = obtenerColaboradoresAmigosModel;