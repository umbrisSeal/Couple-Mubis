const obtenerListas = require("../services/database/obtenerListas");
const obtenerResumenListas = require("../services/database/obtenerResumenListas");
const obtenerNombreUsuario = require('../services/database/obtenerNombreUsuario');

const funcionMapAsync = async (arreglo) => {
    const resultados = [];
    for(const elemento of arreglo) {
        const resultado = await obtenerNombreUsuario(elemento);
        resultados.push(resultado);
    }
    return resultados;
}

async function obtenerListasModel(userID) {
    //console.log(await obtenerNombreUsuario(userID));

    let listas = {};

    const listasArreglo = await obtenerListas(userID);

    listas.cantidadListas = listasArreglo.length;

    if(listas.cantidadListas === 0) {
        listas.listas = [];
        return listas;
    }

    const resumenListas = await obtenerResumenListas(listasArreglo);
    console.log("Resumen Listas: ", resumenListas);

    // {id: 4321, vista: false, urlPoster: 'lgEXNBnFsq8oTck1C2giSvnTjzz.jpg', titulo: 'bowser', año: 2011},
    // Agregar una pelicula a una lista para confirmar si esta bien.

    listas.listas = resumenListas.map( (resumenLista) => {
        const datosLista = {
            id: resumenLista.listaID,
            nombre: resumenLista.nombre,
            privada: resumenLista.esPrivada,
            cantidadPeliculas: resumenLista.peliculas.length,
            urlPosters: resumenLista.peliculas.length > 0 ? resumenLista.peliculas.map((pelicula) => pelicula.urlPoster) : [],
            editores: resumenLista.editores,
        };

        return datosLista;
    });

    // Solucion al problema de no poder usar await en un .map
    for(let i = 0; i < listas.cantidadListas; i++) {
        await funcionMapAsync(listas.listas[i].editores)
            .then(resultado => {
                listas.listas[i].editores = resultado;
            })
        ;
    };

    console.log(listas);


    return listas;

    // Hacer un .map para recorrer cada una de las listas y obtener los nombres de usuarios y el resto de informacion de la lista.

    //console.log(listas);

    // Punto pendiente, punto 3 terminado. "listasArreglo" ya contiene el arreglo con listaID's.

    //console.log(listasArreglo);

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

/*
const datosSimulados = {
    cantidadListas: 5,
    listas: [
        {
            id: '3e9k7pd',
            nombre: 'Para maratonear!!! de d deded dexe',
            editores: ['Michael Jackson', 'Speed Demon', 'Josue Torres', 'Marcus Finix'],
            privada: false,
            cantidadPeliculas: 4,
            urlPosters: ['qayga07ICNDswm0cMJ8P3VwklFZ.jpg', 'wMZU69sPEP8dSNU0nMWVt7b54EQ.jpg', 'O7ncXwZ9bowJGLAfIhe9ZaRZdi.jpg', 'v5wAZwRqpGWmyAaaJ8BBHYuNXnj.jpg'],
        },
*/