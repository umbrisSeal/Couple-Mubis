
/*
    Recibe un userID para identificar un usuario y retorna su atributo "listas".
*/

const conexionMDB = require('./conexionMDB');

async function obtenerListas(userID) {
    const clienteMDB = conexionMDB.conectar();
    const coleccionUsuarios = clienteMDB.db('coupleMubis').collection('usuarios');

    let resultado;

    try {
        resultado = await coleccionUsuarios.findOne({userID: userID}, {projection: {listas: true, _id: false}});
        resultado = resultado.listas;
    } catch {
        resultado = [];
    } finally {
        conexionMDB.desconectar();
    }

    return resultado;
}

module.exports = obtenerListas;