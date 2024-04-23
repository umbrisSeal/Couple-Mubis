const actualizarPerfil = require("../services/database/actualizarPerfil");


async function editarCuentaModel(request) {

    const confirmacion = await actualizarPerfil(request);
    request.error = !confirmacion;
}

module.exports = editarCuentaModel;