const solicitarPeliculasPopulares = require("../services/api/solicitarPeliculasPopulares");


async function obtenerRecomendacionesModel() {

    const peliculasRecomendadas = await solicitarPeliculasPopulares();

    return peliculasRecomendadas;
}

module.exports = obtenerRecomendacionesModel;