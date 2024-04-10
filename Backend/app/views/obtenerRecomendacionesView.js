const obtenerAñoPelicula = require("../helpers/obtenerAñoPelicula");

function obtenerRecomendacionesView(request, response) {

    if(!request.datos) {
        response.status(400).send("No se pudieron obtener peliculas recomendadas.");
        return;
    }

    const datos = request.datos.data.results;
    const datosReducidos = datos.slice(0, 15);

    const recomendaciones = datosReducidos.map((pelicula) => {
        return {
            id: pelicula.id,
            titulo: pelicula.title,
            año: obtenerAñoPelicula(pelicula.release_date),
            urlPoster: pelicula.poster_path,
        }
    });


    response.status(200).json(recomendaciones);
}

module.exports = obtenerRecomendacionesView;