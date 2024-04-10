
/*
    Recive una fecha de una pelicula en formato YYYY-MM-DD y devuelve unicamente el año.
*/

function obtenerAñoPelicula(date) {
    const fecha = new Date(date);
    const año = fecha.getFullYear();

    return año;
}

module.exports = obtenerAñoPelicula;