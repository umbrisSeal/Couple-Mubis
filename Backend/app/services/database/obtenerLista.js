

const conexionMDB = require('./conexionMDB');

async function obtenerLista(listaID) {
    const clienteMDB = conexionMDB.conectar();
    const coleccionListas = clienteMDB.db('coupleMubis').collection('listas');

    let lista;

    try {
        lista = await coleccionListas.findOne({listaID: listaID}, {projection: {_id: false}});
    } catch {
        lista = {};
    } finally {
        conexionMDB.desconectar();
    }

    return lista;
}

module.exports = obtenerLista