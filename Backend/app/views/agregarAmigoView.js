

function agregarAmigoView(request, response) {
    if(!request.amigoExiste) {
        response.status(400).send("El amigo solicitado no existe.");
        return;
    }
    if(request.amigoRepetido) {
        response.status(200).send("El amigo solicitado ya esta agregado.");
        return;
    }
    if(!request.confirmacion) {
        response.status(400).send("No se pudo agregar al usuario solicitado como amigo.");
        return;
    }

    response.status(200).send("Se agrego al nuevo amigo correctamente.");
}

module.exports = agregarAmigoView;