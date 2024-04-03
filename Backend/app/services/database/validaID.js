
/*
    Toma un id y una longitud deseada del ID y retorna un boleano que indica si conincide con la estructura generada de nuestra funcion generarID.
*/

function validaID(id, longitud) {
    const regexID = /^[A-Z0-9]*$/;

    return regexID.test(id) && id.length === longitud;
}

module.exports = validaID;