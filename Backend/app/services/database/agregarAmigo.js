
const conexionMDB = require('./conexionMDB');

async function agregarAmigo(userID, amigoID) {

    const clienteMDB = conexionMDB.conectar();
    const coleccionUsuarios = clienteMDB.db('coupleMubis').collection('usuarios');

    let confirmacion = false;

    try {
        await coleccionUsuarios.updateOne({userID: userID}, {$push: {amigos: amigoID}});
        confirmacion = true;
    } catch {
        confirmacion = false;
    }

    return confirmacion;
}

module.exports = agregarAmigo;