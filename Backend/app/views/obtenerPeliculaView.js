const obtenerAñoPelicula = require("../helpers/obtenerAñoPelicula");


function obtenerPeliculaView(request, response) {

    const datos = request.resultado.data;

    const resultado = {
        titulo: datos.original_title,
        sinopsis: datos.overview,
        popularidad: datos.popularity,
        año: obtenerAñoPelicula(datos.release_date),
        clasificacion: datos.vote_average,
        urlPoster: datos.poster_path
    };

    response.status(200).json(resultado);
}

module.exports = obtenerPeliculaView;