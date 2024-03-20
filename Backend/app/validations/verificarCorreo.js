
/*
    Verifica que un string sea un correo electronico valido (google, yahoo o outlook).
*/

function verificarCorreo(correo) {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexDominioCorreo = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.(com|net|org)$/;

    if(typeof(correo) !== 'string') return false;
    if(!regexCorreo.test(correo) || !regexDominioCorreo.test(correo)) return false;
    if(correo.length == 0 || correo.length > 50) return false;

    return true;
}

module.exports = verificarCorreo;