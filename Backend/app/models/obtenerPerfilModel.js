const objetoVacio = require("../helpers/objetoVacio");
const consultaUsuario = require("../services/database/consultaUsuario");
const obtenerNombreUsuario = require("../services/database/obtenerNombreUsuario");
const obtenerResumenListas = require("../services/database/obtenerResumenListas");


async function obtenerPerfilModel(request) {
    request.datosUsuario = await consultaUsuario(request.idSolicitado);
    if(objetoVacio(request.datosUsuario)) {
        request.error = true;
        return;
    }
    request.error = false;
    request.nombrePreferido = await obtenerNombreUsuario(request.idSolicitado);
    const listasUsuario = request.datosUsuario.listas;
    const resumenListas = await obtenerResumenListas(listasUsuario, true);
    const listasCreadas = resumenListas.filter((lista) => lista.dueño === request.datosUsuario.userID && !lista.esPrivada);
    const listas = listasCreadas.map((lista) => {
        return {
            nombre: lista.nombre,
            id: lista.listaID
        }
    });
    request.listas = listas;
    const datosUsuarioConsultado = await consultaUsuario(request.userID);
    request.esAmigo = datosUsuarioConsultado.amigos.includes(request.idSolicitado);
    request.esBloqueado = request.datosUsuario.bloqueados.includes(request.userID);   // Verificar que el usuario solicitado no tenga bloqueado al usuario solicitante.
}

module.exports = obtenerPerfilModel;