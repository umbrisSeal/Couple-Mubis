const objetoVacio = require("../helpers/objetoVacio");
const agregarAmigo = require("../services/database/agregarAmigo");
const consultaUsuario = require("../services/database/consultaUsuario");

async function agregarAmigoModel(request) {
    // Verificar primero que el amigoID si coincide con un usuario real.

    const userID = request.userID;
    const amigoID = request.amigoID;

    const verificacion = !objetoVacio(await consultaUsuario(amigoID));
    if(!verificacion) {
        request.amigoExiste = false;    // Error, amigo no existe.
        return false;
    }
    request.amigoExiste = true;

    // Verificar que el amigo no halla sido agregado ya.
    const datosUsuario = await consultaUsuario(userID);
    const amigosAgregados = datosUsuario.amigos;
    if(amigosAgregados.includes(amigoID)) {
        request.amigoRepetido = true;   // Error, el amigo ya esta en la lista de amigos.
        return false;
    }
    request.amigoRepetido = false;

    // Agregar al amigo.
    const confirmacion = agregarAmigo(userID, amigoID);
    return confirmacion;
}

module.exports = agregarAmigoModel;