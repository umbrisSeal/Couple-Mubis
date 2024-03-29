
const jwt = require('jsonwebtoken');
const generarSessionToken = require('./generarSessionToken');
const registrarSessionToken = require('../services/database/registrarSessionToken');

async function refreshSessionToken(idToken, request, response) {
    const tiempoExpiracionMilisegundos = 30 * 24 * 60 * 60 * 1000; // 30 dias.
    
    const idTokenPayload = jwt.verify(idToken, process.env.JWT_SECRET, (error, tokenPayload) => {
        if(error) return false;
        return tokenPayload;
    });

    if(!idTokenPayload) return;
    const { userID } = idTokenPayload;

    const nuevoSessionToken = generarSessionToken(userID);
    const resultado = await registrarSessionToken(nuevoSessionToken, request.headers['user-agent']);

    if(!resultado) return;

    response.clearCookie('sessionToken');
    response.cookie('sessionToken', nuevoSessionToken, {
        maxAge: tiempoExpiracionMilisegundos,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
    
}

module.exports = refreshSessionToken;
