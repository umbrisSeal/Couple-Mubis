
/*
    Esta funcion toma un objeto y retorna una copia de dicho objeto.
    Util cuando se trabaja con objetos que tienen objetos dentro, para evitar las referencias internas,
    debido a que en estos casos hacer nuevoObjeto = {...objetoOriginal} no sera suficiente para eliminar
    las referencias de los objetos internos.

    Esta funcion puede recibir objetos con arreglos u objetos internos y retorna una copia del objeto sin referencias
    al original.

*/

export function copiarObjeto(objetoOriginal) {
    if(typeof objetoOriginal !== 'object' || objetoOriginal === null) {
        return objetoOriginal;
    };

    const copia = Array.isArray(objetoOriginal) ? [] : {};

    // Copia recursiva para obtener objetos anidados.
    for(let key in objetoOriginal) {
        if(Object.prototype.hasOwnProperty.call(objetoOriginal, key)) {
            copia[key] = copiarObjeto(objetoOriginal[key]);
        }
    }

    return copia;
}