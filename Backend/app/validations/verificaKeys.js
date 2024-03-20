
/*
    Esta funcion toma un objeto y un arreglo de keys en forma de string. La funcion retorna si todas
    las keys existen en el objeto dado.
*/

function verificaKeys(objeto, keys) {
    
    return keys.every((key) => key in objeto);
}


module.exports = verificaKeys;