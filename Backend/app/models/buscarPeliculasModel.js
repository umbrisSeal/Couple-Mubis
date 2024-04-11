const buscarPeliculas = require("../services/api/buscarPeliculas");


async function buscarPeliculaModel(request, response) {

    const parametroBusqueda = request.body.parametroBusqueda;

    const resultados = await buscarPeliculas(parametroBusqueda);

    request.resultados = resultados.data;
}

module.exports = buscarPeliculaModel;