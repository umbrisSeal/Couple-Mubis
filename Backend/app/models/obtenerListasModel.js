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

    let listas = {};

    const listasArreglo = await obtenerListas(userID);

    listas.cantidadListas = listasArreglo.length;

    if(listas.cantidadListas === 0) {
        listas.listas = [];
        return listas;
    }

    const resumenListas = await obtenerResumenListas(listasArreglo);
    console.log("Resumen Listas: ", resumenListas);

    listas.listas = resumenListas.map( (resumenLista) => {
        const datosLista = {
            id: resumenLista.listaID,
            nombre: resumenLista.nombre,
            editores: resumenLista.editores,
            privada: resumenLista.esPrivada,
            cantidadPeliculas: resumenLista.peliculas.length,
            urlPosters: resumenLista.peliculas.length > 0 ? resumenLista.peliculas.map((pelicula) => pelicula.urlPoster) : [],
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

    return listas;
}

module.exports = obtenerListasModel;