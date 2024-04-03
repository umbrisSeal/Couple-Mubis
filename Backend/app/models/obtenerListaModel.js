const objetoVacio = require("../helpers/objetoVacio");
const consultaUsuarios = require("../services/database/consultaUsuarios");
const obtenerLista = require("../services/database/obtenerLista");

async function obtenerListaModel(listaID) {

    const datosLista = await obtenerLista(listaID);
    if(objetoVacio(datosLista)) return false;
    const datosEditores = await consultaUsuarios(datosLista.editores);
    const datosLectores = await consultaUsuarios(datosLista.lectores);

    return {
        datosLista,
        datosEditores,
        datosLectores
    };

}

module.exports = obtenerListaModel;