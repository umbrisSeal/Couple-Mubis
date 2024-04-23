

function borrarAmigoView(request, response) {
    if(request.confirmacion) {
        response.status(200).send("Amigo eliminado correctamente.");
        return;
    } else {
        response.status(400).send("El amigo seleccionado no pudo ser eliminado.");
        return;
    }
}

module.exports = borrarAmigoView;