const obtenerListas = require("../services/database/obtenerListas");
const obtenerResumenListas = require("../services/database/obtenerResumenListas");

function incluyePelicula(peliculaID, arregloPeliculas) {
    const arregloPeliculasID = arregloPeliculas.map((pelicula) => pelicula.id);
    return arregloPeliculasID.includes(peliculaID);
}

async function obtenerListasAutoridadModel(request) {

    const peliculaID = request.body.peliculaID;
    const userID = request.userID;

    const arregloListasID = await obtenerListas(userID);
    const datosListas = await obtenerResumenListas(arregloListasID, true);

    const listasFiltradas = datosListas.map((lista) => {
        return {
            listaID: lista.listaID,
            nombre: lista.nombre,
            puedeEditar: lista.dueño === userID || lista.editores.include(userID) ? true : false,
            peliculaAgregada: incluyePelicula(peliculaID, lista.peliculas),
        }
    });

    request.listas = listasFiltradas.filter((lista) => lista.puedeEditar);
}

module.exports = obtenerListasAutoridadModel;