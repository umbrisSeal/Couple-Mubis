
/*
    Recibe un idToken y retorna el userID contenido en el.
*/

const jwt = require('jsonwebtoken');

function obtenerUserIdToken(idToken) {

    const userID = jwt.verify(idToken, process.env.JWT_SECRET, (error, tokenPayload) => {
        if(error) return '';
        return tokenPayload.userID;
    })

    return userID;
}


module.exports = obtenerUserIdToken;