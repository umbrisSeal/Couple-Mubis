
/*
    Toma un objeto donde estan definidos los nuevos parametros y edita el perfil.
*/

const conexionMDB = require('./conexionMDB');

async function actualizarPerfil(request) {

    const userID = request.userID;
    const {alias, usarAlias, usarPrivacidad, bibliografia, idiomaBusqueda} = request.body;

    const clienteMDB = conexionMDB.conectar();
    const coleccionUsuarios = clienteMDB.db('coupleMubis').collection('usuarios');

    let confirmacion = false;

    try {
        await coleccionUsuarios.updateOne(
            {userID: userID},
            {$set: {alias: alias, usarAlias: usarAlias, usarPrivacidad: usarPrivacidad, bibliografia: bibliografia, idiomaBusqueda: idiomaBusqueda}}
        );
        confirmacion = true;
    } catch {
        confirmacion = false;
    } finally {
        conexionMDB.desconectar();
    }

    return confirmacion;
}

module.exports = actualizarPerfil;