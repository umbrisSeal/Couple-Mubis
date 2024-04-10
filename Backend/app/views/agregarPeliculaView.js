

function agregarPeliculaView(request, response) {
    if(request.resultado) {
        response.status(200).send("Pelicula agregada exitosamente.");
        return;
    } else {
        response.status(200).send("No se pudo agregar la pelicula.");
        return;
    }
}

module.exports = agregarPeliculaView;