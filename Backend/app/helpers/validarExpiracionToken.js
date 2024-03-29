
function validarExpiracionToken(exp) {

    const tiempoActual = Math.floor(Date.now()/1000);

    return tiempoActual < exp;  // Si el tiempo actual supera el tiempo exp, el token ya expiro.

}

module.exports = validarExpiracionToken;