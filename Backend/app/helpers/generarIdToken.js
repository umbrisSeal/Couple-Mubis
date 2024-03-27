
const jwt = require('jsonwebtoken');
const generarID = require('./generarID');

function generarIdToken(userID) {
    const idTokenID = generarID() + generarID();

    const idToken = jwt.sign(
        {tokenID: idTokenID, userID: userID},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_ID_LIFESPAN, issuer: process.env.JWT_ISS}
    );

    return idToken;
}

module.exports = generarIdToken;
