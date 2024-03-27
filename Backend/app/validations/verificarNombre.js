
/*
    Verifica que el string proporcionado como nombre, no exceda la longitud deseada, ademas de solo incluir caracteres alfanumerios y espacios.
*/

function verificarNombre(nombre) {
    const regexNombre = /^[a-zA-Z0-9 _-]+$/;

    if(nombre.length < 3 || nombre.length > 15) return false;
    if(!regexNombre.test(nombre)) return false;

    return true;
}

module.exports = verificarNombre;