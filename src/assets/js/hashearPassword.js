
/*
    Por defecto, la salt que usaremos en el frontend sera la declarada en esta funcion.
*/

async function hashearPassword(passwordOriginal) {
    const salt = [80,6,169,122,242,41,24,233,93,225,165,195,246,27,139,119];

    const encoder = new TextEncoder();
    const data = encoder.encode(passwordOriginal);

    const concatData = new Uint8Array(data.length + salt.length);
    concatData.set(data);
    concatData.set(salt, data.length);

    const hashBuffer = await crypto.subtle.digest('SHA-256', concatData);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const passwordHash = hashArray.map( (bite) => {
        return bite.toString(16).padStart(2, '0');
    }).join('');


    return passwordHash;
}

export default hashearPassword;

/*
    Se debe de usar como un promise. (async-await)
    hashPassword(stringPasswrodOriginal)
        .then(hash => {...})
        .catch(error => {...})
    ;
*/
