
/*
    Retorna la fecha actual en el formato DD-MM-AAAA en un string.
*/

function obtenerFechaActual() {

    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth()).padStart(2, '0');
    const año = String(fecha.getFullYear());

    const fechaActual = `${dia}-${mes}-${año}`;

    return fechaActual;
}

module.exports = obtenerFechaActual;