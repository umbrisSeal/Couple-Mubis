
const crearUsuario = require("../services/database/crearUsuario");

async function crearCuentaModel(request, response) {

    const estado = await crearUsuario(request.body);

    return estado;
}

module.exports = crearCuentaModel;