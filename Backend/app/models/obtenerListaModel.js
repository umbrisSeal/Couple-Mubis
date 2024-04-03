const obtenerLista = require("../services/database/obtenerLista");



async function obtenerListaModel(listaID, userID) {

    const lista = await obtenerLista(listaID);

    console.log(lista);



}

module.exports = obtenerListaModel;