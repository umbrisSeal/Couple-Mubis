
/*
    Recive un sessionToken (extrae session ID, tokenID y exp), userID y UserAgent, y lo registra en la base de datos.
*/

const jwt = require('jsonwebtoken');
const conexionMDB = require('./conexionMDB');

async function registrarSessionToken(sessionToken, userID, userAgent) {

    const tokenPayload = jwt.verify(sessionToken, process.env.JWT_SECRET, (error, payloadDecoded) => {
        if(error) return null;
        return payloadDecoded;
    });

    if(tokenPayload === null) return false;

    const { tokenID, sessionID, exp } = tokenPayload;

    const clienteMDB = conexionMDB.conectar();
    const coleccionSesiones = clienteMDB.db('coupleMubis').collection('sesiones');

    let resultado = false;

    try {
        await coleccionSesiones.insertOne(
            {
                tokenID: tokenID,
                sessionID: sessionID,
                userID: userID,
                userAgent: userAgent,
                expiration: exp
            }
        );
        resultado = true;

    } catch {
        resultado = false;
    } finally {
        conexionMDB.desconectar();
    }

    return resultado;

}

module.exports = registrarSessionToken;