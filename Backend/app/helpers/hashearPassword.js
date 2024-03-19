
const bcrypt = require('bcrypt');

/*
    Esta funcion encripta un password dado con una salt dada. Si no se especifica una salt, sera creada una nueva al azar.
*/

async function hashearPassword(passwordOriginal, saltUsada) {
    try {
        const saltRounds = 14;
        
        const salt = saltUsada || await bcrypt.genSalt(saltRounds);

        const passwordHash = await bcrypt.hash(passwordOriginal, salt);

        return {
            hash: passwordHash,
            salt: salt
        }

    } catch(error) {
        console.log("Error al intentar hashear el password: ", error);
        throw error;
    }
}

module.exports = hashearPassword;

// Igual que su version de frontend, requiere usarse como un promise (async-await).