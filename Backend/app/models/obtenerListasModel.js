const obtenerListas = require("../services/database/obtenerListas");

async function obtenerListasModel(userID) {

    const listasArreglo = await obtenerListas(userID);

    // Punto pendiente, punto 3 terminado. "listasArreglo" ya contiene el arreglo con listaID's.

    console.log(listasArreglo);

    /*
        1. Solicitar el idToken del usuario actual.
        2. Extraer el userID del token.
        3. Consultar en la base de datos su atributo listas. (obtener listaID's).
        4. Para cada lista:
        5. Consultar la informacion de la lista. (listaID, nombre, editores(editores), privacidad, cantidad de peliculas, url de posters)
        6. Extraer los userIDs de la lista de editores.
        7. Eliminar el userID del usuario actual (idToken) de la lista.
        8. Consultar el nombre de cada userID, dependiendo de su privacidad.
        // Hacer una funcion para consultar nombres. Toma un arreglo de userIDs y retorna el nombre del usuario dado su nivel de privacidad.
    */


}

module.exports = obtenerListasModel;