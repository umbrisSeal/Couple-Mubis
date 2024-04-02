const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const crearLista = require("../services/database/crearLista");


async function crearListaModel(nuevoNombre, idToken) {

    const userID = obtenerUserIdToken(idToken);

    const resultado = await crearLista(nuevoNombre, userID);

    return resultado;
}

module.exports = crearListaModel;