
function validacionEditarCuenta(body) {
    if(typeof(body.alias) !== 'string' || body.alias.length > 15) return false;
    if(typeof(body.usarAlias) !== 'boolean') return false;
    if(typeof(body.usarPrivacidad) !== 'boolean') return false;
    if(typeof(body.bibliografia) !== 'string' || body.bibliografia.length > 160) return false;
    if(typeof(body.idiomaBusqueda) !== 'number' || body.idiomaBusqueda < 0 || body.idiomaBusqueda > 2) return false;

    if(body.usarAlias && body.alias === 0) return false;

    return true;
}

module.exports = validacionEditarCuenta;