
/*
    Valida la firma de un idToken, su tiempo de expiracion y verifica que el userID exista.
*/

const jwt = require('jsonwebtoken');
const validarExpiracionToken = require('../helpers/validarExpiracionToken');
const consultaUsuario = require('../services/database/consultaUsuario');
const objetoVacio = require('../helpers/objetoVacio');

async function validarIdToken(idToken) {

    const tokenPayload = jwt.verify(idToken, process.env.JWT_SECRET, (error, tokenPayload) => {
        if(error) return false;
        if(!validarExpiracionToken(tokenPayload.exp)) return false;
        return tokenPayload;
    });

    const tokenVerificado = !objetoVacio(await consultaUsuario(tokenPayload.userID));


    return tokenVerificado;
}

module.exports = validarIdToken;