
/*
    Toma un parametro peliculaID y verifica que cumpla las especificaciones de ID de nuestra API de TMDB.
*/

function validarPeliculaId(peliculaID) {
    if(peliculaID === null) return false;
    if(parseInt(peliculaID) === NaN) return false;

    const id = parseInt(peliculaID);
    if(id > 10000000 || id < 0) return false;

    return true;
}


module.exports = validarPeliculaId;