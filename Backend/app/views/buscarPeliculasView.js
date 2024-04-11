const obtenerAñoPelicula = require("../helpers/obtenerAñoPelicula");


function buscarPeliculasView(request, response) {

    if(!request.resultados) {
        response.status(400).send("No se pudo hacer la consulta de peliculas.");
        return;
    }
    
    const resultados = request.resultados;
    const resultadosFiltrados = resultados.results.slice(0, 12);

    const peliculas = resultadosFiltrados.map((resultado) => {
        return {
            titulo: resultado.title,
            año: obtenerAñoPelicula(resultado.release_date),
            id: resultado.id,
            urlPoster: resultado.poster_path,
        }
    });

    const resultadoBusqueda = {
        resultados: resultadosFiltrados.length,
        peliculas,
    };


    response.status(200).send(resultadoBusqueda);
}

module.exports = buscarPeliculasView;