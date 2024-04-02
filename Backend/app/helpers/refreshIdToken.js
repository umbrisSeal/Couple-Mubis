
const jwt = require('jsonwebtoken');
const generarIdToken = require('./generarIdToken');

function refreshIdToken(idToken, response) {
    const tiempoExpiracionMilisegundos = 30 * 24 * 60 * 60 * 1000; // 30 dias.
    
    const idTokenPayload = jwt.verify(idToken, process.env.JWT_SECRET, (error, tokenPayload) => {
        if(error) return false;
        return tokenPayload;
    });

    if(!idTokenPayload) return;
    const { userID } = idTokenPayload;

    const nuevoIdToken = generarIdToken(userID);

    response.clearCookie('idToken');
    response.cookie('idToken', nuevoIdToken, {
        maxAge: tiempoExpiracionMilisegundos,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
}

module.exports = refreshIdToken;