const solicitarPelicula = require("../services/api/solicitarPelicula");

async function obtenerPeliculaModel(peliculaID) {

    // Mandar a llamar la API externa y recuperar la informacion, si existe.
    const datos = await solicitarPelicula(peliculaID);
    if(!datos) return false;

    return datos;

}



module.exports = obtenerPeliculaModel;
