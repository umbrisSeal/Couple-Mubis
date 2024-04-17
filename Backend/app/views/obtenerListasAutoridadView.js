

function obtenerListasAutoridadView(request, response) {
    const listas = request.listas;
    response.status(200).json(listas);
}

module.exports = obtenerListasAutoridadView;