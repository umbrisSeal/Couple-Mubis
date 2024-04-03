
/*
    Recive un arrelgo de userID's y devuelve toda la informacion de los usuarios.
*/

const conexionMDB = require('./conexionMDB');

async function consultaUsuarios(userIDs) {
    const clienteMDB = conexionMDB.conectar();
    const coleccionUsuarios = clienteMDB.db('coupleMubis').collection('usuarios');

    let resultado = [];

    try {
        resultado = await coleccionUsuarios.find({userID: {$in: userIDs}}, {projection: {_id: false}}).toArray();

    } catch {
        resultado = [];
    } finally {
        conexionMDB.desconectar();
    }

    return resultado;
}

module.exports = consultaUsuarios;

