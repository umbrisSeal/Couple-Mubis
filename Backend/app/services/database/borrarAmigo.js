
const conexionMDB = require('./conexionMDB');

async function borrarAmigo(userID, amigoID) {
    const clienteMDB = conexionMDB.conectar();
    const coleccionUsuarios = clienteMDB.db('coupleMubis').collection('usuarios');

    let confirmacion = false;

    try {
        await coleccionUsuarios.updateOne({userID: userID}, {$pull: {amigos: amigoID}});
        confirmacion = true;
    } catch {
        confirmacion = false;
    }

    return confirmacion;
}


module.exports = borrarAmigo;