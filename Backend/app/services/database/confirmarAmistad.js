
/*
    Funcion para simular el funcionamiento del endpoint para confirmar la amistad entre amigos. Toma userID y amigoID y verifica si son amigos mutuos.
*/

const objetoVacio = require("../../helpers/objetoVacio");
const consultaUsuarios = require("./consultaUsuarios");

async function confirmarAmistad(userID, amigoID) {
    const datosUsuarios = await consultaUsuarios([userID, amigoID]);
    const amigosUsuario = datosUsuarios[0].amigos;
    const amigosAmigo = datosUsuarios[1].amigos;

    if(objetoVacio(datosUsuarios[0]) || objetoVacio(datosUsuarios[1])) {
        return false;
    }

    const sonAmigos = amigosUsuario.includes(amigoID) && amigosAmigo.includes(userID);
    return sonAmigos;
}

module.exports = confirmarAmistad;