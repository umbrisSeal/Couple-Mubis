const borrarLista = require("../services/database/borrarLista");
const obtenerLista = require("../services/database/obtenerLista");


async function borrarListaModel(request) {

    const {userID, listaID} = request;

    const datosLista = await obtenerLista(listaID);

    if(!datosLista) return false;   // La lista solicitada no existe.

    if(datosLista.dueño !== userID) {
        request.resultado = false;  // Este usuario no es el dueño de la lista.
        return;
    }

    const {editores, lectores, dueño} = datosLista;
    const colaboradores = [dueño, ...editores, ...lectores];

    request.respuesta = await borrarLista(listaID, colaboradores);
}

module.exports = borrarListaModel;
