const solicitarPelicula = require("../services/api/solicitarPelicula");

async function obtenerPeliculaModel(peliculaID) {

    // Mandar a llamar la API externa y recuperar la informacion, si existe.
    const datos = await solicitarPelicula(peliculaID);

}



module.exports = obtenerPeliculaModel;


/*
Datos solicitados:
titulo: (con caracteres especiales escapados).
sinopsis: (sinopsis general).
popularidad: Puntje de popularidad,
año: año
clasificacion: mas puntajes.
urlPoster: La url del poster solicitado.
*/