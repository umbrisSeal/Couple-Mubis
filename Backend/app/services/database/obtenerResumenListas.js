
/*
    Recibe un arreglo que contiene listaID's y retorna un objeto resumen de la informacion de esas listas. El resumen contiene: ID, nombre, nombre de editores (otro modulo), si es privada, cantidad de peliculas y urlPoster de las peliculas.
*/

const conexionMDB = require('./conexionMDB');

async function obtenerResumenListas(listaIDs) {
    const clienteMDB = conexionMDB.conectar();
    const coleccionListas = clienteMDB.db('coupleMubis').collection('listas');

    let listas;

    try {
        listas = await coleccionListas.find({listaID: {$in: listaIDs}}, {projection: {_id: false, lectores: false, dueño: false}}).toArray();
    } catch {
        console.log("Error!");
        listas = [];
    } finally {
        conexionMDB.desconectar();
    }

    return listas;
}

module.exports = obtenerResumenListas