
export function obtenerNombres(usuarios, incluirse) {
    // Construye un string con un arreglo nombres agregando comas y "y" antes del elemento final.
    // Tambien se solicita si se debe de incluir el "tu" en la lista.

    if(usuarios.length == 0 && !incluirse) return 'Ninguno.';

    const nombres = usuarios.map((usuario) => {
        return usuario.nombre;
    });

    const listaNombres = incluirse ? ['Tu', ...nombres] : [...nombres];

    return listaNombres.reduce((listaString, nombre, index, arreglo) => {
        if(index == 0) {
            if(index === arreglo.length - 1) {
                // Solo hay un integrante en la lista.
                return incluirse ? 'Solo tu' : nombre;
            } else {
                // El usuario, o integrante no es el ultimo.
                return nombre;
            }
        } else if(index === arreglo.length -1) {
            // Este nombre es el ultimo.
            return listaString + ' y ' + nombre;
        } else {
            // Este no es el ultimo nombre.
            return listaString + ', ' + nombre;
        }

    }, '') + '.';
}