
/*
    Toma un string que representa el nombre de una lista. Retorna un boleano indicando si es un nombre de lista aceptado.
*/


function validarNombreLista(nombreLista) {
    const regexNombreLista = /^[a-zA-Z0-9.,?!+-\s]*$/;
    const longitudMaxima = 30;

    const nombreValidoLista = regexNombreLista.test(nombreLista) && nombreLista.length > 0 && nombreLista.length <= longitudMaxima;

    return nombreValidoLista;
}


module.exports = validarNombreLista;