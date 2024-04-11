
const conexionMDB = require('./conexionMDB');

async function actualizarPeliculas(listaID, peliculasActualizadas) {

    const clienteMDB = conexionMDB.conectar();
    const coleccionListas = clienteMDB.db('coupleMubis').collection('listas');

    let resultado;

    try {
        await coleccionListas.updateOne({listaID: listaID}, {$set: {peliculas: peliculasActualizadas}});
        resultado = true;
    } catch {
        resultado = false;
    } finally {
        conexionMDB.desconectar();
    }

    return resultado;
}

module.exports = actualizarPeliculas;