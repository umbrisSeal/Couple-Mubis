
/*
    Verifica que un password del frontend tenga la estructura correcta. Que sea un hash alfanumerico de longitud especifica.
*/

function verificarPassword(passwordHash) {
    const regexAlfanumerico = /^[a-zA-Z0-9]+$/;

    if(typeof(passwordHash) !== 'string')   return false;
    if(passwordHash.length != 64)   return false;
    if(!regexAlfanumerico.test(passwordHash))   return false;

    return true;
}