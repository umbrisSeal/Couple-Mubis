
const crypto = require('crypto');

function generarID() {
    const longitud = 10;

    const randomBytes = crypto.randomBytes(longitud);
    const stringBase64 = randomBytes.toString('base64');
    const hashID = stringBase64.replace(/[+/=]/g, '');

    return hashID.substring(0, longitud).toUpperCase();
}

module.exports = generarID;
