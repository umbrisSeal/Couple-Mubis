
const jwt = require('jsonwebtoken');
const generarID = require('./generarID');

function generarSessionToken(userID) {
    const sessionTokenID = generarID() + generarID();
    const sessionID = generarID() + generarID() + generarID();

    const sessionToken = jwt.sign(
        {tokenID: sessionTokenID, sessionID: sessionID, userID: userID},
        process.env.JWT_SECRET,
        {expiresIn: process. env.JWT_SESSION_LIFESPAN, issuer: process.env.JWT_ISS}
    );

    return sessionToken;
}

module.exports = generarSessionToken;

/*
const sessionToken = jwt.sign(
        {tokenID: sessionTokenID, sessionID: sessionID},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_SESSION_LIFESPAN, issuer: process.env.JWT_ISS}
    );
*/