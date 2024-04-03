
/*
    Recibe un userID y retorna el nombre del usuario dependiendo de sus preferencias de alias y privacidad.
*/

const objetoVacio = require("../../helpers/objetoVacio");
const consultaUsuario = require("./consultaUsuario");

async function obtenerNombreUsuario(userID) {

    const datosUsuario = await consultaUsuario(userID);
    if(objetoVacio(datosUsuario)) return '';    // El usuario no existe o no se encontro.

    if(datosUsuario.usarPrivacidad) {
        return 'Usuario Anonimo';       // El usuario desea permanecer anonimo.
    } else if(datosUsuario.usarAlias) {
        return datosUsuario.alias;      // El usuario desea usar su Alias.
    } else {
        return datosUsuario.usuario;    // El usuario desea usar su nombre de usuario refugio14.
    }

}

module.exports = obtenerNombreUsuario;