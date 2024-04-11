

function actualizarPeliculaView(request, response) {
    if(request.resultadoOperacion) {
        response.status(200).send("Operacion exitosa, lista actualizada.");
        return;
    } else {
        response.status(200).send("Operacion fallida, no se actualizaron las peliculas.");
    }
}

module.exports = actualizarPeliculaView;