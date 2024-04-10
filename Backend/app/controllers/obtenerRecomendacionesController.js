const obtenerRecomendacionesModel = require("../models/obtenerRecomendacionesModel");
const obtenerRecomendacionesView = require("../views/obtenerRecomendacionesView");


async function obtenerRecomendaciones(request, response) {
    
    const recomendacionesDatos = await obtenerRecomendacionesModel();

    request.datos = recomendacionesDatos;

    obtenerRecomendacionesView(request, response);

}

module.exports = obtenerRecomendaciones;