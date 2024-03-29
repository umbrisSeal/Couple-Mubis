
/*
    Dado un objeto, verifica si es un objeto vacio o no.
*/

function objetoVacio(objeto) {
    
    return Object.keys(objeto).length === 0;
}

module.exports = objetoVacio;