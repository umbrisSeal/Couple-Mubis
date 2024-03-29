
/*
    Valida un sessionToken y retorna un boleano indicando si es valido o no. Necesita: un sessionToken, un idToken y acceso al userAgnet.
*/

const jwt = require('jsonwebtoken');
const validarExpiracionToken = require('../helpers/validarExpiracionToken');
const objetoVacio = require('../helpers/objetoVacio');
const consultaSesion = require('../services/database/consultaSesion');

async function validarSessionToken(sessionToken, idToken, userAgent) {

    const idTokenPayload = jwt.verify(idToken, process.env.JWT_SECRET, (error, tokenPayload) => {
        if(error) return false;
        if(!validarExpiracionToken(tokenPayload.exp)) return false;
        return tokenPayload;
    });

    if(!idTokenPayload) return false;   // El idToken no tiene la firma valida o ya expiro.

    const { userID } = idTokenPayload;

    const sessionTokenPayload = jwt.verify(sessionToken, process.env.JWT_SECRET, (error, tokenPayload) => {
        if(error) return false;
        return tokenPayload;
    });

    if(!sessionTokenPayload) return false;  // El session token ya no es valido o tiene firma incorrecta.
    
    if(sessionTokenPayload.userID !== userID) return false; // El userID del idToken no coincide con el del sessionToken.

    const { sessionID } = sessionTokenPayload;

    const informacionSesion = await consultaSesion(sessionID);

    if(objetoVacio(informacionSesion)) return false; // La sesion ya no existe.

    if(informacionSesion.userID !== userID) return false; // Los userID no coinciden.

    if(informacionSesion.userAgent !== userAgent) return false; // El dispositivo es difrente.

    return true;
}

module.exports = validarSessionToken;