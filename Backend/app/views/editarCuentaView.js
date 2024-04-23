
function editarCuentaView(request, response) {
    if(request.error) {
        response.status(400).send("Los cambios no se han podido guardar.");
        return;
    } else {
        response.status(200).send("Cambios guardados con exito.");
    }
}

module.exports = editarCuentaView;