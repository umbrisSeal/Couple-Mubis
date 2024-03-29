
/*
    Devuelve toda la informacion de una sesion apartir del sessionID.
*/

const conexionMDB = require('./conexionMDB');

async function consultaSesion(sessionID) {
    const regexIdSession = /^[A-Z0-9]{30}$/;

    const clienteMDB = conexionMDB.conectar();
    const coleccionSesiones = clienteMDB.db('coupleMubis').collection('sesiones');

    let resultado;

    if(regexIdSession.test(sessionID)) {

        try {
            resultado = await coleccionSesiones.findOne({sessionID: sessionID});

        } catch {
            resultado = null;
        }

    } else {
        resultado = null;
    }

    conexionMDB.desconectar();
    
    return resultado === null ? {} : resultado;
}

module.exports = consultaSesion;


/*
  const query = { $or: [{ name: 'myValue' }, { age: 'myValue' }] };
*/